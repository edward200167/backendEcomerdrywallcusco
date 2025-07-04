const { ConjuntoCarritoProducto } = require('../models/index');

const conjuntoCarritoProductoSeeder = async () => {
  try {
    console.log('📦 Creando conjuntos de carrito...');

    const conjuntosData = [
      {
        id: 1,
        userId: 1,
        estado: 'carrito',
        items: [1, 2, 3]
      },
      {
        id: 2,
        userId: 1,
        estado: 'rechazado',
        items: [4]
      },
      {
        id: 3,
        userId: 2,
        estado: 'confirmado',
        items: [5, 6]
      },
      {
        id: 4,
        userId: 3,
        estado: 'pendiente',
        items: [7, 8]
      }
    ];

    for (const conjuntoData of conjuntosData) {
      const { items, ...basicData } = conjuntoData;
      
      const conjunto = await ConjuntoCarritoProducto.create(basicData);
      
      if (items && items.length > 0) {
        await conjunto.setItems(items);
      }
    }

    console.log('✅ Conjuntos de carrito creados exitosamente');
    return conjuntosData;
  } catch (error) {
    console.error('❌ Error al crear conjuntos de carrito:', error);
    throw error;
  }
};

module.exports = conjuntoCarritoProductoSeeder;