const { OfertaProducto } = require('../models/index');

const ofertaProductoSeeder = async () => {
  try {
    console.log('🎯 Creando ofertas de productos...');

    const ofertasData = [
      {
        id: 1,
        nombre: 'Descuento Lanzamiento',
        descripcion: 'Oferta especial para nuevos productos',
        tipoDescuento: 'porcentaje',
        valorDescuento: 15.00,
        fechaInicio: new Date('2025-01-01'),
        fechaFin: new Date('2025-03-31'),
        compraMinima: 100.00,
        descuentoMaximoCliente: 50.00,
        aplicaPara: 'ambos',
        estado: 'activa',
        productos: [1, 2, 3]
      },
      {
        id: 2,
        nombre: 'Promo Empresarial',
        descripcion: 'Descuento exclusivo para empresas',
        tipoDescuento: 'soles',
        valorDescuento: 25.00,
        fechaInicio: new Date('2025-02-01'),
        fechaFin: new Date('2025-04-30'),
        compraMinima: 500.00,
        descuentoMaximoCliente: 100.00,
        aplicaPara: 'empresa',
        estado: 'activa',
        productos: [4, 5]
      },
      {
        id: 3,
        nombre: 'Liquidación de Temporada',
        descripcion: 'Descuento por liquidación de stock',
        tipoDescuento: 'porcentaje',
        valorDescuento: 30.00,
        fechaInicio: new Date('2025-03-01'),
        fechaFin: new Date('2025-05-31'),
        compraMinima: 200.00,
        aplicaPara: 'cliente',
        estado: 'activa',
        productos: [2, 4]
      }
    ];

    for (const ofertaData of ofertasData) {
      const { productos, ...basicData } = ofertaData;
      
      const oferta = await OfertaProducto.create(basicData);
      
      if (productos && productos.length > 0) {
        await oferta.setProductos(productos);
      }
    }

    console.log('✅ Ofertas de productos creadas exitosamente');
    return ofertasData;
  } catch (error) {
    console.error('❌ Error al crear ofertas de productos:', error);
    throw error;
  }
};

module.exports = ofertaProductoSeeder;