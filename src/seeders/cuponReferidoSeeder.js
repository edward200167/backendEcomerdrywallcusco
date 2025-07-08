const { Cupon } = require('../models');

const cuponReferidoSeeder = async () => {
  try {
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
    
    console.log('✅ Cupones de referido seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en cuponReferidoSeeder:', error);
  }
};

module.exports = cuponReferidoSeeder;