const CategoriaProducto = require('../models/CategoriaProducto');

const categoriaProductoSeeder = async () => {
  try {
    const categoriasData = [
      { id: 1, nombre: 'Tableros' },
      { id: 2, nombre: 'Perfiles' },
      { id: 3, nombre: 'Tornillos' },
      { id: 4, nombre: 'Cinta' },
      { id: 5, nombre: 'Herramienta' },
      { id: 6, nombre: 'Accesorios' }
    ];

    const categoriasCreadas = [];

    for (const categoriaData of categoriasData) {
      const existeCategoria = await CategoriaProducto.findByPk(categoriaData.id);
      
      if (!existeCategoria) {
        const nuevaCategoria = await CategoriaProducto.create(categoriaData);
        categoriasCreadas.push(nuevaCategoria);
        console.log(`✅ Categoría creada: ${categoriaData.nombre} (ID: ${categoriaData.id})`);
      } else {
        console.log(`ℹ️ Categoría ya existe: ${existeCategoria.nombre} (ID: ${existeCategoria.id})`);
      }
    }

    console.log('✅ Proceso de categorías completado. Nuevas creadas:', categoriasCreadas.length);
    return categoriasCreadas;
  } catch (error) {
    console.error('❌ Error al crear categorías de producto:', error);
    throw error;
  }
};

module.exports = categoriaProductoSeeder;