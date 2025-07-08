const ReferralRewardService = require('../utils/referralRewardService');

const aplicarRecompensasReferidoSeeder = async () => {
  try {
    // Verificar recompensas para todos los usuarios
    const userIds = [1, 2, 3]; // IDs de usuarios en el seeder
    
    for (const userId of userIds) {
      await ReferralRewardService.checkAndAssignReferralRewards(userId);
    }
    
    console.log('✅ Recompensas de referido aplicadas correctamente');
  } catch (error) {
    console.error('❌ Error aplicando recompensas de referido:', error);
  }
};

module.exports = aplicarRecompensasReferidoSeeder;