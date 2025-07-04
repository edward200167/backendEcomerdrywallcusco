const EtiquetaProducto = require('../models/EtiquetaProducto');

const etiquetaProductoSeeder = async () => {
  try {
    const etiquetasData = [
      { id: 1, nombre: 'Fuego' },
      { id: 2, nombre: 'Seguridad' },
      { id: 3, nombre: 'Comercial' },
      { id: 4, nombre: 'Estructura' },
      { id: 5, nombre: 'Muro' }
    ];

    const etiquetasCreadas = [];

    for (const etiquetaData of etiquetasData) {
      const existeEtiqueta = await EtiquetaProducto.findByPk(etiquetaData.id);
      
      if (!existeEtiqueta) {
        const nuevaEtiqueta = await EtiquetaProducto.create(etiquetaData);
        etiquetasCreadas.push(nuevaEtiqueta);
        console.log(`✅ Etiqueta creada: ${etiquetaData.nombre} (ID: ${etiquetaData.id})`);
      } else {
        console.log(`ℹ️ Etiqueta ya existe: ${existeEtiqueta.nombre} (ID: ${existeEtiqueta.id})`);
      }
    }

    console.log('✅ Proceso de etiquetas completado. Nuevas creadas:', etiquetasCreadas.length);
    return etiquetasCreadas;
  } catch (error) {
    console.error('❌ Error al crear etiquetas de producto:', error);
    throw error;
  }
};

module.exports = etiquetaProductoSeeder;