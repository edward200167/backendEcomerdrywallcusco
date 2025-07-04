const sequelize = require('../utils/connection');
// Cargar las asociaciones ANTES de los seeders
require('../models/index');

const userSeeder = require('./userSeeder');
const unidadProductoSeeder = require('./unidadProductoSeeder');
const categoriaProductoSeeder = require('./categoriaProductoSeeder');
const marcaProductoSeeder = require('./marcaProductoSeeder');
const motivoLiquidacionSeeder = require('./motivoLiquidacionSeeder');
const etiquetaProductoSeeder = require('./etiquetaProductoSeeder');
const usoProductoSeeder = require('./usoProductoSeeder');
const imagenesProductosSeeder = require('./imagenesProductosSeeder');
const volumenDescuentoSeeder = require('./volumenDescuentoSeeder');
const productoSeeder = require('./productoSeeder.simple');
const ofertaProductoSeeder = require('./ofertaProductoSeeder');
const conjuntoCarritoProductoSeeder = require('./conjuntoCarritoProductoSeeder');
const carritoProductoSeeder = require('./carritoProductoSeeder');
const relacionesSeeder = require('./relacionesSeeder');
const resetSequences = require('./resetSequences');

const runSeeders = async () => {
  try {
    console.log('🌱 Iniciando seeders...');
    
    // Sincronizar la base de datos (force para recrear tablas con las correcciones)
    await sequelize.sync({ force: true });
    console.log('✅ Base de datos sincronizada');
    
    // Ejecutar seeders en orden (primero las tablas sin dependencias)
    await unidadProductoSeeder();
    await categoriaProductoSeeder();
    await marcaProductoSeeder();
    await motivoLiquidacionSeeder();
    await etiquetaProductoSeeder();
    await usoProductoSeeder();
    await volumenDescuentoSeeder();
    
    // Luego los usuarios
    await userSeeder();
    
    // Productos (después de todas las dependencias)
    await productoSeeder();
    
    // Ofertas de productos (después de productos)
    await ofertaProductoSeeder();
    
    // Finalmente las imágenes (pueden tener dependencias con productos)
    await imagenesProductosSeeder();
    
    // Conjuntos de carrito (después de usuarios)
    await conjuntoCarritoProductoSeeder();
    
    // Items del carrito (después de conjuntos y productos)
    await carritoProductoSeeder();
    
    // Crear relaciones many-to-many con SQL directo
    await relacionesSeeder();
    
    // Resetear secuencias de auto-incremento
    await resetSequences();
    
    console.log('🎉 Seeders ejecutados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
    process.exit(1);
  }
};

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  runSeeders();
}

module.exports = runSeeders;