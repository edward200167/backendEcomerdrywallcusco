const { ConfigRolRequisito } = require('../models');

const configRolRequisitoSeeder = async () => {
  try {
    const requisitos = [
      {
        producto_id: 1, // Producto ejemplo: Drywall estándar
        cantidad_minima: 50,
        activo: true
      },
      {
        producto_id: 2, // Producto ejemplo: Tornillos
        cantidad_minima: 100,
        activo: true
      },
      {
        producto_id: 3, // Producto ejemplo: Perfiles
        cantidad_minima: 20,
        activo: true
      }
    ];

    await ConfigRolRequisito.bulkCreate(requisitos, {
      ignoreDuplicates: true
    });

    console.log('✅ ConfigRolRequisito seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en ConfigRolRequisito seeder:', error);
  }
};

module.exports = configRolRequisitoSeeder;