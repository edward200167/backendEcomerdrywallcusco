const { MetodoPago } = require('../models');

const metodoPagoSeeder = async () => {
  try {
    const metodosPago = [
      {
        nombre: 'Efectivo',
        descripcion: 'Pago en efectivo al recibir el pedido',
        urlImagen: '/images/pagos/efectivo.png',
        numeroReferencia: null,
        opcional: false
      },
      {
        nombre: 'Yape',
        descripcion: 'Transferencia mediante aplicación Yape',
        urlImagen: '/images/pagos/yape.png',
        numeroReferencia: '987654321',
        opcional: false
      },
      {
        nombre: 'Plin',
        descripcion: 'Transferencia mediante aplicación Plin',
        urlImagen: '/images/pagos/plin.png',
        numeroReferencia: '987654321',
        opcional: false
      },
      {
        nombre: 'Transferencia BCP',
        descripcion: 'Transferencia bancaria a cuenta BCP',
        urlImagen: '/images/pagos/bcp.png',
        numeroReferencia: '191-12345678-0-01',
        opcional: false
      },
      {
        nombre: 'Transferencia Interbank',
        descripcion: 'Transferencia bancaria a cuenta Interbank',
        urlImagen: '/images/pagos/interbank.png',
        numeroReferencia: '898-87654321-0-02',
        opcional: true
      },
      {
        nombre: 'Depósito BCP',
        descripcion: 'Depósito en ventanilla o agente BCP',
        urlImagen: '/images/pagos/deposito-bcp.png',
        numeroReferencia: '191-12345678-0-01',
        opcional: true
      }
    ];

    await MetodoPago.bulkCreate(metodosPago, {
      ignoreDuplicates: true
    });

    console.log('✅ MetodoPago seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en MetodoPago seeder:', error);
  }
};

module.exports = metodoPagoSeeder;