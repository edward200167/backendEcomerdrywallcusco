const { CarritoProducto } = require('../models/index');

const carritoProductoSeeder = async () => {
  try {
    console.log('🛒 Creando items del carrito...');

    const carritoProductoData = [
      // Items independientes sin conjuntoCarritoProductoId
      {
        id: 1,
        productoId: 1,
        cantidadProductosSoles: 2,
        cantidadProductosPuntos: 0,
        totalSoles: 91.80,
        totalPuntos: 0
      },
      {
        id: 2,
        productoId: 2,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 12.50,
        totalPuntos: 0
      },
      {
        id: 3,
        productoId: 5,
        cantidadProductosSoles: 0,
        cantidadProductosPuntos: 1,
        totalSoles: 0,
        totalPuntos: 25
      },
      {
        id: 4,
        productoId: 5,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 24.90,
        totalPuntos: 0
      },
      {
        id: 5,
        productoId: 3,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 68.90,
        totalPuntos: 0
      },
      {
        id: 6,
        productoId: 4,
        cantidadProductosSoles: 1,
        cantidadProductosPuntos: 0,
        totalSoles: 52.90,
        totalPuntos: 0
      },
      {
        id: 7,
        productoId: 1,
        cantidadProductosSoles: 0,
        cantidadProductosPuntos: 1,
        totalSoles: 0,
        totalPuntos: 46
      },
      {
        id: 8,
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