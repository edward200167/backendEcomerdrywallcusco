const sequelize = require('../utils/connection');

const resetSequences = async () => {
  try {
    console.log('🔄 Reseteando secuencias de auto-incremento...');
    
    // Resetear secuencias para que empiecen después del último ID insertado
    await sequelize.query(`
      SELECT setval(pg_get_serial_sequence('unidad_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM unidad_producto;
      SELECT setval(pg_get_serial_sequence('categoria_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM categoria_producto;
      SELECT setval(pg_get_serial_sequence('marca_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM marca_producto;
      SELECT setval(pg_get_serial_sequence('motivacion_liquidacion', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM motivacion_liquidacion;
      SELECT setval(pg_get_serial_sequence('etiqueta_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM etiqueta_producto;
      SELECT setval(pg_get_serial_sequence('uso_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM uso_producto;
      SELECT setval(pg_get_serial_sequence('volumen_descuentos', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM volumen_descuentos;
      SELECT setval(pg_get_serial_sequence('imagenes_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM imagenes_producto;
      SELECT setval(pg_get_serial_sequence('productos', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM productos;
      SELECT setval(pg_get_serial_sequence('usuarios', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM usuarios;
      SELECT setval(pg_get_serial_sequence('conjunto_carrito_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM conjunto_carrito_producto;
      SELECT setval(pg_get_serial_sequence('carrito_producto', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM carrito_producto;
    `);

    console.log('✅ Secuencias reseteadas exitosamente');
  } catch (error) {
    console.error('❌ Error al resetear secuencias:', error);
    throw error;
  }
};

module.exports = resetSequences;