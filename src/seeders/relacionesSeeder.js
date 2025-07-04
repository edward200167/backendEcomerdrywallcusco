const sequelize = require('../utils/connection');

const relacionesSeeder = async () => {
  try {
    console.log('🔗 Creando relaciones many-to-many...');
    
    // Crear relaciones ProductoEtiqueta (N:M)
    await sequelize.query(`
      INSERT INTO "ProductoEtiqueta" ("productoId", "etiquetaProductoId", "createdAt", "updatedAt") 
      VALUES 
        (1, 4, NOW(), NOW()),
        (1, 5, NOW(), NOW()),
        (2, 2, NOW(), NOW()),
        (2, 3, NOW(), NOW()),
        (3, 1, NOW(), NOW()),
        (3, 2, NOW(), NOW()),
        (3, 4, NOW(), NOW()),
        (4, 4, NOW(), NOW()),
        (4, 5, NOW(), NOW()),
        (5, 4, NOW(), NOW())
      ON CONFLICT ("productoId", "etiquetaProductoId") DO NOTHING;
    `);

    // Crear relaciones ProductoVolumenDescuento (N:M)
    await sequelize.query(`
      INSERT INTO "ProductoVolumenDescuento" ("productoId", "volumenDescuentoId", "createdAt", "updatedAt") 
      VALUES 
        (1, 1, NOW(), NOW()),
        (1, 2, NOW(), NOW()),
        (2, 3, NOW(), NOW()),
        (3, 1, NOW(), NOW()),
        (3, 4, NOW(), NOW()),
        (4, 2, NOW(), NOW()),
        (4, 3, NOW(), NOW()),
        (5, 1, NOW(), NOW()),
        (5, 2, NOW(), NOW())
      ON CONFLICT ("productoId", "volumenDescuentoId") DO NOTHING;
    `);

    // Crear relaciones ProductoImagen (N:M)
    await sequelize.query(`
      INSERT INTO "ProductoImagen" ("productoId", "imagenProductoId", "createdAt", "updatedAt") 
      VALUES 
        (1, 1, NOW(), NOW()),
        (1, 2, NOW(), NOW()),
        (1, 3, NOW(), NOW()),
        (2, 4, NOW(), NOW()),
        (2, 5, NOW(), NOW()),
        (2, 6, NOW(), NOW()),
        (3, 7, NOW(), NOW()),
        (3, 8, NOW(), NOW()),
        (3, 9, NOW(), NOW()),
        (4, 10, NOW(), NOW()),
        (5, 4, NOW(), NOW()),
        (5, 5, NOW(), NOW())
      ON CONFLICT ("productoId", "imagenProductoId") DO NOTHING;
    `);

    // Las relaciones CarritoProducto ahora se crean en carritoProductoSeeder.js

    console.log('✅ Relaciones creadas exitosamente');
  } catch (error) {
    console.error('❌ Error al crear relaciones:', error);
    throw error;
  }
};

module.exports = relacionesSeeder;