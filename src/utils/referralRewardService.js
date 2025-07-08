const { User, Cupon, UserCupon, ConjuntoCarritoProducto, ConfigPuntos } = require('../models');
const { Op } = require('sequelize');

class ReferralRewardService {
  static async checkAndAssignReferralRewards(userId) {
    try {
      console.log(`🔍 Verificando recompensas para usuario ${userId}`);
      
      const user = await User.findByPk(userId);
      if (!user) {
        console.log(`❌ Usuario ${userId} no encontrado`);
        return;
      }

      const config = await ConfigPuntos.findOne();
      if (!config) {
        console.log('❌ Configuración de puntos no encontrada');
        return;
      }

      // Obtener total de compras del usuario
      const totalCompras = await this.getTotalComprasUsuario(userId);
      console.log(`💰 Total compras usuario ${userId}: ${totalCompras} soles`);

      // Verificar si es un usuario referido y cumple condiciones
      if (user.codigoQueLoReferio && totalCompras >= parseFloat(config.compra_min_para_ser_referido)) {
        console.log(`👥 Usuario ${userId} fue referido por ${user.codigoQueLoReferio} y cumple condiciones`);
        await this.assignReferredUserReward(user, config);
      } else if (user.codigoQueLoReferio) {
        console.log(`⚠️ Usuario ${userId} fue referido pero no cumple mínimo de compras (${totalCompras} < ${config.compra_min_para_ser_referido})`);
      }

      // Verificar si ha referido a alguien y cumple condiciones
      if (user.codigoReferido && totalCompras >= parseFloat(config.compra_min_para_referir)) {
        console.log(`🎯 Usuario ${userId} puede referir y cumple condiciones`);
        await this.assignReferrerReward(user, config);
      } else if (user.codigoReferido) {
        console.log(`⚠️ Usuario ${userId} puede referir pero no cumple mínimo de compras (${totalCompras} < ${config.compra_min_para_referir})`);
      }
    } catch (error) {
      console.error('Error en checkAndAssignReferralRewards:', error);
    }
  }

  static async getTotalComprasUsuario(userId) {
    const conjuntos = await ConjuntoCarritoProducto.findAll({
      where: { 
        userId,
        estado: 'confirmado'
      },
      include: [{
        association: 'items',
        attributes: ['totalSoles']
      }]
    });

    return conjuntos.reduce((total, conjunto) => {
      const totalConjunto = conjunto.items.reduce((sum, item) => {
        return sum + parseFloat(item.totalSoles || 0);
      }, 0);
      return total + totalConjunto;
    }, 0);
  }

  static async assignReferredUserReward(user, config) {
    console.log(`🔍 Verificando recompensa por ser referido para usuario ${user.id}`);
    
    // Verificar si ya recibió puntos por ser referido
    // Usamos un campo especial en el user para trackear esto
    const currentUser = await User.findByPk(user.id);
    
    // Verificar si ya procesamos esta recompensa (podemos usar un flag o verificar si ya tiene los puntos base)
    const puntosIniciales = 0; // puntos base sin recompensas
    const puntosActuales = currentUser.puntos;
    
    // Simple check: si el usuario fue referido y tiene puntos base, no aplicar de nuevo
    if (currentUser.codigoQueLoReferio && puntosActuales >= config.puntos_por_ser_referido) {
      console.log(`ℹ️ Usuario ${user.id} ya tiene puntos suficientes, puede que ya haya recibido la recompensa`);
      return; // Por simplicidad, no aplicamos doble recompensa
    }

    // Actualizar puntos del usuario
    await currentUser.update({
      puntos: puntosActuales + config.puntos_por_ser_referido
    });

    console.log(`✅ Recompensa por ser referido asignada a usuario ${user.id}: ${config.puntos_por_ser_referido} puntos`);
  }

  static async assignReferrerReward(user, config) {
    console.log(`🔍 Verificando recompensa por referir para usuario ${user.id}`);
    
    // Verificar cuántos usuarios ha referido que cumplan condiciones
    const usuariosReferidos = await User.findAll({
      where: { codigoQueLoReferio: user.codigoReferido }
    });

    let referidosValidos = 0;
    for (const referido of usuariosReferidos) {
      const totalComprasReferido = await this.getTotalComprasUsuario(referido.id);
      
      if (totalComprasReferido >= parseFloat(config.compra_min_para_ser_referido)) {
        referidosValidos++;
      }
    }

    if (referidosValidos > 0) {
      // Calcular puntos por referir (por cada referido válido)
      const puntosAAgregar = referidosValidos * config.puntos_por_referido;
      
      // Actualizar puntos del usuario
      const currentUser = await User.findByPk(user.id);
      await currentUser.update({
        puntos: currentUser.puntos + puntosAAgregar
      });

      console.log(`✅ Recompensa por referir asignada a usuario ${user.id}: ${puntosAAgregar} puntos (${referidosValidos} referidos válidos)`);
    } else {
      console.log(`ℹ️ Usuario ${user.id} no tiene referidos válidos aún`);
    }
  }
}

module.exports = ReferralRewardService;