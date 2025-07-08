const Cupon = require('../models/Cupon');

const cuponSeeder = async () => {
  try {
    const cuponesData = [
      { 
        id: 1, 
        codigo: 'BIENVENIDO10', 
        tipo_descuento: 'porcentaje', 
        valor: 10.00, 
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 100, 
        usado: 15, 
        activo: true 
      },
      { 
        id: 2, 
        codigo: 'DESCUENTO20', 
        tipo_descuento: 'soles', 
        valor: 20.00, 
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-06-30'),
        max_uso: 50, 
        usado: 8, 
        activo: true 
      },
      { 
        id: 3, 
        codigo: 'VERANO2025', 
        tipo_descuento: 'porcentaje', 
        valor: 15.00, 
        fecha_inicio: new Date('2025-03-01'),
        fecha_fin: new Date('2025-04-30'),
        max_uso: 200, 
        usado: 45, 
        activo: true 
      },
      { 
        id: 4, 
        codigo: 'PRIMERACOMPRA', 
        tipo_descuento: 'soles', 
        valor: 25.00, 
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 500, 
        usado: 123, 
        activo: true 
      },
      { 
        id: 5, 
        codigo: 'EXPIRADO50', 
        tipo_descuento: 'porcentaje', 
        valor: 50.00, 
        fecha_inicio: new Date('2024-01-01'),
        fecha_fin: new Date('2024-12-31'),
        max_uso: 10, 
        usado: 10, 
        activo: false 
      }
    ];

    const cuponesCreados = [];

    for (const cuponData of cuponesData) {
      const existeCupon = await Cupon.findByPk(cuponData.id);
      
      if (!existeCupon) {
        const nuevoCupon = await Cupon.create(cuponData);
        cuponesCreados.push(nuevoCupon);
        console.log(`✅ Cupón creado: ${cuponData.codigo} - ${cuponData.tipo_descuento === 'porcentaje' ? cuponData.valor + '%' : 'S/.' + cuponData.valor} (ID: ${cuponData.id})`);
      } else {
        console.log(`ℹ️ Cupón ya existe: ${existeCupon.codigo} (ID: ${existeCupon.id})`);
      }
    }

    console.log('✅ Proceso de cupones completado. Nuevos creados:', cuponesCreados.length);
    return cuponesCreados;
  } catch (error) {
    console.error('❌ Error al crear cupones:', error);
    throw error;
  }
};

module.exports = cuponSeeder;