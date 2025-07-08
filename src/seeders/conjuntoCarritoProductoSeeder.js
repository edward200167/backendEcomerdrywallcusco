const { ConjuntoCarritoProducto } = require('../models/index');

const conjuntoCarritoProductoSeeder = async () => {
  try {
    console.log('📦 Creando conjuntos de carrito...');

    const conjuntosData = [
      {
        id: 1,
        userId: 1,
        estado: 'carrito',
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        telefono: '987654321',
        distrito: 'San Blas',
        direccion: 'Av. El Sol 123',
        referencia: 'Casa azul con portón negro',
        tipoEnvioId: 1,
        tipoComprobante: 'boleta',
        metodoPagoId: 1
      },
      {
        id: 2,
        userId: 1,
        estado: 'rechazado',
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        telefono: '987654321',
        distrito: 'Santiago',
        direccion: 'Jr. Comercio 456',
        referencia: 'Edificio moderno, piso 3',
        tipoEnvioId: 2,
        tipoComprobante: 'factura',
        ruc: '20123456789',
        razonSocial: 'Constructora Pérez SAC',
        informacionFactura: {
          direccionFiscal: 'Jr. Comercio 456, Santiago'
        },
        metodoPagoId: 2
      },
      {
        id: 3,
        userId: 2,
        estado: 'confirmado',
        nombre: 'María García',
        email: 'maria@email.com',
        telefono: '965432187',
        distrito: 'Wanchaq',
        direccion: 'Calle Los Andes 789',
        referencia: 'Casa de dos pisos, puerta verde',
        tipoEnvioId: 3,
        tipoComprobante: 'boleta',
        metodoPagoId: 3
      },
      {
        id: 4,
        userId: 3,
        estado: 'pendiente',
        nombre: 'Carlos López',
        email: 'carlos@email.com',
        telefono: '954321876',
        distrito: 'San Sebastián',
        direccion: 'Av. La Cultura 321',
        referencia: 'Frente al parque principal',
        tipoEnvioId: 4,
        tipoComprobante: 'factura',
        ruc: '20987654321',
        razonSocial: 'Distribuidora López EIRL',
        informacionFactura: {
          direccionFiscal: 'Av. La Cultura 321, San Sebastián'
        },
        metodoPagoId: 4
      }
    ];

    await ConjuntoCarritoProducto.bulkCreate(conjuntosData, {
      updateOnDuplicate: ['userId', 'estado']
    });

    console.log('✅ Conjuntos de carrito creados exitosamente');
    return conjuntosData;
  } catch (error) {
    console.error('❌ Error al crear conjuntos de carrito:', error);
    throw error;
  }
};

module.exports = conjuntoCarritoProductoSeeder;