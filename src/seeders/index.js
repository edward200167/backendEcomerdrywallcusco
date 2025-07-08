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
const configPremiosRuletaSeeder = require('./configPremiosRuletaSeeder');
const configPuntosSeeder = require('./configPuntosSeeder');
const configRolRequisitoSeeder = require('./configRolRequisitoSeeder');
const configRolBeneficioSeeder = require('./configRolBeneficioSeeder');
const configRuletaSeeder = require('./configRuletaSeeder');
const tipoEnvioSeeder = require('./tipoEnvioSeeder');
const metodoPagoSeeder = require('./metodoPagoSeeder');
const configSorteosSeeder = require('./configSorteosSeeder');
const codigoReferidoSeeder = require('./codigoReferidoSeeder');
const cuponSeeder = require('./cuponSeeder');
const cuponReferidoSeeder = require('./cuponReferidoSeeder');
const userCuponSeeder = require('./userCuponSeeder');
const aplicarRecompensasReferidoSeeder = require('./aplicarRecompensasReferidoSeeder');

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
    
    // Configuraciones del sistema (sin dependencias de productos)
    await configPuntosSeeder();
    await configRuletaSeeder();
    await configSorteosSeeder();
    await tipoEnvioSeeder();
    await metodoPagoSeeder();
    
    // Cupones (sin dependencias)
    await cuponSeeder();
    
    // Luego los usuarios
    await userSeeder();
    
    // Productos (después de todas las dependencias)
    await productoSeeder();
    
    // Configuraciones que dependen de productos (después de crear productos)
    await configRolRequisitoSeeder();
    await configRolBeneficioSeeder();
    await configPremiosRuletaSeeder();
    
    // Códigos de referido (después de usuarios)
    await codigoReferidoSeeder();
    
    // User-Cupón (después de usuarios y cupones)
    await userCuponSeeder();
    
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
    
    // Aplicar recompensas de referidos después de que todo esté creado
    await aplicarRecompensasReferidoSeeder();
    
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