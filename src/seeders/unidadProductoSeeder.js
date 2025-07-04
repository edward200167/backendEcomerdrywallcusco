const UnidadProducto = require('../models/UnidadProducto');

const unidadProductoSeeder = async () => {
  try {
    const unidadesData = [
      { id: 1, nombre: 'Unidad' },
      { id: 2, nombre: 'Kilos' },
      { id: 3, nombre: 'Plancha' }
    ];

    const unidadesCreadas = [];

    for (const unidadData of unidadesData) {
      const existeUnidad = await UnidadProducto.findByPk(unidadData.id);
      
      if (!existeUnidad) {
        const nuevaUnidad = await UnidadProducto.create(unidadData);
        unidadesCreadas.push(nuevaUnidad);
        console.log(`✅ Unidad creada: ${unidadData.nombre} (ID: ${unidadData.id})`);
      } else {
        console.log(`ℹ️ Unidad ya existe: ${existeUnidad.nombre} (ID: ${existeUnidad.id})`);
      }
    }

    console.log('✅ Proceso de unidades completado. Nuevas creadas:', unidadesCreadas.length);
    return unidadesCreadas;
  } catch (error) {
    console.error('❌ Error al crear unidades de producto:', error);
    throw error;
  }
};

module.exports = unidadProductoSeeder;