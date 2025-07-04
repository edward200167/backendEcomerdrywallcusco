const MarcaProducto = require('../models/MarcaProducto');

const marcaProductoSeeder = async () => {
  try {
    const marcasData = [
      { id: 1, nombre: 'GYPLAC' },
      { id: 2, nombre: 'USG Boral' },
      { id: 3, nombre: 'SCAFISA' }
    ];

    const marcasCreadas = [];

    for (const marcaData of marcasData) {
      const existeMarca = await MarcaProducto.findByPk(marcaData.id);
      
      if (!existeMarca) {
        const nuevaMarca = await MarcaProducto.create(marcaData);
        marcasCreadas.push(nuevaMarca);
        console.log(`✅ Marca creada: ${marcaData.nombre} (ID: ${marcaData.id})`);
      } else {
        console.log(`ℹ️ Marca ya existe: ${existeMarca.nombre} (ID: ${existeMarca.id})`);
      }
    }

    console.log('✅ Proceso de marcas completado. Nuevas creadas:', marcasCreadas.length);
    return marcasCreadas;
  } catch (error) {
    console.error('❌ Error al crear marcas de producto:', error);
    throw error;
  }
};

module.exports = marcaProductoSeeder;