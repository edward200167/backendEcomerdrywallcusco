const UsoProducto = require('../models/UsoProducto');

const usoProductoSeeder = async () => {
  try {
    const usosData = [
      { 
        id: 1, 
        nombre: 'Estructura Vertical',
        descripcion: 'Para construcción de estructuras verticales y tabiques divisorios'
      },
      { 
        id: 2, 
        nombre: 'Áreas con Requerimiento RF',
        descripcion: 'Para espacios que requieren resistencia al fuego certificada'
      },
      { 
        id: 3, 
        nombre: 'Áreas Húmedas',
        descripcion: 'Para baños, cocinas y espacios con alta humedad'
      }
    ];

    const usosCreados = [];

    for (const usoData of usosData) {
      const existeUso = await UsoProducto.findByPk(usoData.id);
      
      if (!existeUso) {
        const nuevoUso = await UsoProducto.create(usoData);
        usosCreados.push(nuevoUso);
        console.log(`✅ Uso creado: ${usoData.nombre} (ID: ${usoData.id})`);
      } else {
        console.log(`ℹ️ Uso ya existe: ${existeUso.nombre} (ID: ${existeUso.id})`);
      }
    }

    console.log('✅ Proceso de usos completado. Nuevos creados:', usosCreados.length);
    return usosCreados;
  } catch (error) {
    console.error('❌ Error al crear usos de producto:', error);
    throw error;
  }
};

module.exports = usoProductoSeeder;