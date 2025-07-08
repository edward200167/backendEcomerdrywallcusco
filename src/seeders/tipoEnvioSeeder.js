const { TipoEnvio } = require('../models');

const tipoEnvioSeeder = async () => {
  try {
    const tiposEnvio = [
      {
        nombre: 'Recojo en tienda',
        precio: 0.00,
        descripcion: 'Retira tu pedido directamente en nuestra tienda física'
      },
      {
        nombre: 'Delivery zona centro',
        precio: 15.00,
        descripcion: 'Entrega a domicilio en el centro de la ciudad (24-48 horas)'
      },
      {
        nombre: 'Delivery zona norte',
        precio: 25.00,
        descripcion: 'Entrega a domicilio en la zona norte (48-72 horas)'
      },
      {
        nombre: 'Delivery zona sur',
        precio: 25.00,
        descripcion: 'Entrega a domicilio en la zona sur (48-72 horas)'
      },
      {
        nombre: 'Envío express',
        precio: 45.00,
        descripcion: 'Entrega el mismo día (solo para pedidos antes de las 12:00 PM)'
      }
    ];

    await TipoEnvio.bulkCreate(tiposEnvio, {
      ignoreDuplicates: true
    });

    console.log('✅ TipoEnvio seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en TipoEnvio seeder:', error);
  }
};

module.exports = tipoEnvioSeeder;