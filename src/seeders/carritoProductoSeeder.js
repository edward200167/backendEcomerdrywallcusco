const { CarritoProducto } = require('../models/index');

const carritoProductoSeeder = async () => {
  try {
    console.log('🛒 Creando items del carrito...');

    const carritoProductoData = [
      // Items del conjunto 1 (carrito del usuario 1)
      {
        id: 1,
        conjuntoCarritoProductoId: 1,
        productoId: 1,
        cantidadProductosSoles: 2,
        cantidadProductosPuntos: 0,
        totalSoles: 91.80,
        totalPuntos: 0
      },
      {
        id: 2,
        conjuntoCarritoProductoId: 1,
        productoId: 2,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 12.50,
        totalPuntos: 0
      },
      {
        id: 3,
        conjuntoCarritoProductoId: 1,
        productoId: 5,
        cantidadProductosSoles: 0,
        cantidadProductosPuntos: 1,
        totalSoles: 0,
        totalPuntos: 25
      },
      // Items del conjunto 2 (rechazado del usuario 1)
      {
        id: 4,
        conjuntoCarritoProductoId: 2,
        productoId: 5,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 24.90,
        totalPuntos: 0
      },
      // Items del conjunto 3 (confirmado del usuario 2)
      {
        id: 5,
        conjuntoCarritoProductoId: 3,
        productoId: 3,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 68.90,
        totalPuntos: 0
      },
      {
        id: 6,
        conjuntoCarritoProductoId: 3,
        productoId: 4,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 52.90,
        totalPuntos: 0
      },
      // Items del conjunto 4 (pendiente del usuario 3)
      {
        id: 7,
        conjuntoCarritoProductoId: 4,
        productoId: 1,
        cantidadProductosSoles: 0,
        cantidadProductosPuntos: 1,
        totalSoles: 0,
        totalPuntos: 46
      },
      {
        id: 8,
        conjuntoCarritoProductoId: 4,
        productoId: 3,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 68.90,
        totalPuntos: 0
      }
    ];

    await CarritoProducto.bulkCreate(carritoProductoData, {
      updateOnDuplicate: ['productoId', 'cantidadProductosSoles', 'cantidadProductosPuntos', 'totalSoles', 'totalPuntos']
    });

    console.log('✅ Items del carrito creados exitosamente');
    return carritoProductoData;
  } catch (error) {
    console.error('❌ Error al crear items del carrito:', error);
    throw error;
  }
};

module.exports = carritoProductoSeeder;