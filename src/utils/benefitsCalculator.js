const { ConfigRolBeneficio } = require('../models');

/**
 * Obtiene los beneficios de un rol específico
 * @param {string} rol - Rol del usuario ('cliente' o 'empresarial')
 * @returns {Promise<Object>} Beneficios del rol
 */
async function getRoleBenefits(rol) {
  try {
    const benefits = await ConfigRolBeneficio.findOne({
      where: { 
        rol: rol,
        habilitado: true 
      }
    });

    if (!benefits) {
      return {
        rol: rol,
        descuento_empresarial: 0,
        envio_gratis_desde: 0,
        habilitado: false
      };
    }

    return {
      rol: benefits.rol,
      descuento_empresarial: parseFloat(benefits.descuento_empresarial),
      envio_gratis_desde: parseFloat(benefits.envio_gratis_desde),
      habilitado: benefits.habilitado
    };

  } catch (error) {
    console.error('Error getting role benefits:', error);
    throw error;
  }
}

/**
 * Calcula el precio final aplicando descuentos y beneficios de rol
 * @param {number} precio - Precio original
 * @param {string} rol - Rol del usuario
 * @param {number} totalCompra - Total de la compra (para calcular envío gratis)
 * @returns {Promise<Object>} Información del precio con descuentos aplicados
 */
async function calculateFinalPrice(precio, rol, totalCompra = 0) {
  try {
    const benefits = await getRoleBenefits(rol);
    
    let precioFinal = precio;
    let descuentoAplicado = 0;
    let envioGratis = false;

    // Aplicar descuento empresarial
    if (rol === 'empresarial' && benefits.descuento_empresarial > 0) {
      descuentoAplicado = precio * (benefits.descuento_empresarial / 100);
      precioFinal = precio - descuentoAplicado;
    }

    // Verificar envío gratis
    if (benefits.envio_gratis_desde > 0 && totalCompra >= benefits.envio_gratis_desde) {
      envioGratis = true;
    }

    return {
      precioOriginal: precio,
      precioFinal: precioFinal,
      descuentoAplicado: descuentoAplicado,
      porcentajeDescuento: benefits.descuento_empresarial,
      envioGratis: envioGratis,
      montoMinimoEnvioGratis: benefits.envio_gratis_desde,
      rol: rol,
      beneficiosHabilitados: benefits.habilitado
    };

  } catch (error) {
    console.error('Error calculating final price:', error);
    throw error;
  }
}

/**
 * Calcula los beneficios para un carrito completo
 * @param {Array} items - Array de items del carrito con {precio, cantidad}
 * @param {string} rol - Rol del usuario
 * @returns {Promise<Object>} Resumen completo del carrito con beneficios
 */
async function calculateCartBenefits(items, rol) {
  try {
    const benefits = await getRoleBenefits(rol);
    
    let subtotal = 0;
    let totalDescuento = 0;
    const itemsConDescuento = [];

    // Calcular subtotal y descuentos por item
    for (const item of items) {
      const precioUnitario = item.precio;
      const cantidad = item.cantidad;
      const subtotalItem = precioUnitario * cantidad;
      
      let descuentoItem = 0;
      if (rol === 'empresarial' && benefits.descuento_empresarial > 0) {
        descuentoItem = subtotalItem * (benefits.descuento_empresarial / 100);
      }

      const precioFinalItem = subtotalItem - descuentoItem;

      itemsConDescuento.push({
        ...item,
        precioUnitario: precioUnitario,
        subtotalOriginal: subtotalItem,
        descuentoAplicado: descuentoItem,
        precioFinal: precioFinalItem
      });

      subtotal += subtotalItem;
      totalDescuento += descuentoItem;
    }

    const totalFinal = subtotal - totalDescuento;
    const envioGratis = benefits.envio_gratis_desde > 0 && totalFinal >= benefits.envio_gratis_desde;

    return {
      items: itemsConDescuento,
      subtotal: subtotal,
      totalDescuento: totalDescuento,
      totalFinal: totalFinal,
      porcentajeDescuento: benefits.descuento_empresarial,
      envioGratis: envioGratis,
      montoMinimoEnvioGratis: benefits.envio_gratis_desde,
      faltaParaEnvioGratis: envioGratis ? 0 : Math.max(0, benefits.envio_gratis_desde - totalFinal),
      rol: rol,
      beneficiosHabilitados: benefits.habilitado
    };

  } catch (error) {
    console.error('Error calculating cart benefits:', error);
    throw error;
  }
}

module.exports = {
  getRoleBenefits,
  calculateFinalPrice,
  calculateCartBenefits
};