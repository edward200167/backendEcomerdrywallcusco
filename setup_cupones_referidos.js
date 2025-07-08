const sequelize = require('./src/utils/connection');
const { Cupon } = require('./src/models');
const ReferralRewardService = require('./src/utils/referralRewardService');

const setupCuponesReferidos = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    // Crear cupones de referidos
    const cupones = [
      {
        codigo: 'REFERIDO30',
        tipo_descuento: 'soles',
        valor: 30.00,
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      },
      {
        codigo: 'REFERIR50',
        tipo_descuento: 'soles',
        valor: 50.00,
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      }
    ];

    for (const cuponData of cupones) {
      const existeCupon = await Cupon.findOne({ 
        where: { codigo: cuponData.codigo } 
      });
      
      if (!existeCupon) {
        await Cupon.create(cuponData);
        console.log(`✅ Cupón creado: ${cuponData.codigo}`);
      } else {
        console.log(`ℹ️ Cupón ya existe: ${cuponData.codigo}`);
      }
    }

    // Aplicar recompensas de referidos
    console.log('\n🎁 Aplicando recompensas de referidos...');
    const userIds = [1, 2, 3];
    
    for (const userId of userIds) {
      console.log(`Verificando usuario ${userId}...`);
      await ReferralRewardService.checkAndAssignReferralRewards(userId);
    }

    console.log('\n✅ Setup de cupones de referidos completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en setup:', error);
    process.exit(1);
  }
};

setupCuponesReferidos();