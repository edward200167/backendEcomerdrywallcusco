const { ConfigRolRequisito, ConfigRolBeneficio, CarritoProducto, ConjuntoCarritoProducto, Producto, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Valida si un usuario puede convertirse en empresarial
 * @param {number} userId - ID del usuario
 * @returns {Promise<{canUpgrade: boolean, requirements: Array, userPurchases: Array}>}
 */
async function validateUserForBusinessRole(userId) {
  try {
    // Obtener todos los requisitos activos para rol empresarial
    const requirements = await ConfigRolRequisito.findAll({
      where: { activo: true },
      include: [{
        model: Producto,
        as: 'producto',
        attributes: ['id', 'nombre']
      }]
    });

    if (requirements.length === 0) {
      return {
        canUpgrade: true,
        requirements: [],
        userPurchases: [],
        message: 'No hay requisitos definidos para el rol empresarial'
      };
    }

    // Obtener todas las compras confirmadas del usuario
    const userPurchases = await CarritoProducto.findAll({
      include: [{
        model: ConjuntoCarritoProducto,
        as: 'conjunto',
        where: {
          userId: userId,
          estado: 'confirmado'
        }
      }, {
        model: Producto,
        as: 'producto',
        attributes: ['id', 'nombre']
      }]
    });

    // Agrupar compras por producto y sumar cantidades
    const purchasesByProduct = userPurchases.reduce((acc, purchase) => {
      const productId = purchase.productoId;
      const totalQuantity = purchase.cantidadProductosSoles + purchase.cantidadProductosPuntos;
      
      if (!acc[productId]) {
        acc[productId] = {
          productId,
          productName: purchase.producto.nombre,
          totalQuantity: 0
        };
      }
      acc[productId].totalQuantity += totalQuantity;
      return acc;
    }, {});

    // Verificar si cumple con todos los requisitos
    const requirementChecks = requirements.map(req => {
      const userPurchase = purchasesByProduct[req.producto_id];
      const purchasedQuantity = userPurchase ? userPurchase.totalQuantity : 0;
      
      return {
        productId: req.producto_id,
        productName: req.producto.nombre,
        requiredQuantity: req.cantidad_minima,
        purchasedQuantity,
        meets: purchasedQuantity >= req.cantidad_minima
      };
    });

    const canUpgrade = requirementChecks.every(check => check.meets);

    return {
      canUpgrade,
      requirements: requirementChecks,
      userPurchases: Object.values(purchasesByProduct),
      message: canUpgrade ? 'El usuario cumple todos los requisitos para rol empresarial' : 'El usuario no cumple todos los requisitos'
    };

  } catch (error) {
    console.error('Error validating user for business role:', error);
    throw error;
  }
}

/**
 * Actualiza automáticamente el rol del usuario si cumple los requisitos
 * @param {number} userId - ID del usuario
 * @returns {Promise<{updated: boolean, newRole: string, message: string}>}
 */
async function autoUpgradeUserRole(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Si ya es empresarial, no hacer nada
    if (user.rol === 'empresarial') {
      return {
        updated: false,
        newRole: user.rol,
        message: 'El usuario ya tiene rol empresarial'
      };
    }

    // Validar si puede ser empresarial
    const validation = await validateUserForBusinessRole(userId);
    
    if (validation.canUpgrade) {
      await user.update({ rol: 'empresarial' });
      return {
        updated: true,
        newRole: 'empresarial',
        message: 'Usuario actualizado a rol empresarial automáticamente'
      };
    }

    return {
      updated: false,
      newRole: user.rol,
      message: 'El usuario no cumple los requisitos para rol empresarial'
    };

  } catch (error) {
    console.error('Error auto-upgrading user role:', error);
    throw error;
  }
}

module.exports = {
  validateUserForBusinessRole,
  autoUpgradeUserRole
};