const { ConfigRolBeneficio } = require('../models');

const configRolBeneficioSeeder = async () => {
  try {
    const beneficios = [
      {
        rol: 'cliente',
        descuento_empresarial: 0.00,
        envio_gratis_desde: 200.00,
        habilitado: true
      },
      {
        rol: 'empresarial',
        descuento_empresarial: 15.00, // 15% de descuento
        envio_gratis_desde: 100.00,    // Envío gratis desde 100 soles
        habilitado: true
      }
    ];

    await ConfigRolBeneficio.bulkCreate(beneficios, {
      ignoreDuplicates: true
    });

    console.log('✅ ConfigRolBeneficio seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en ConfigRolBeneficio seeder:', error);
  }
};

module.exports = configRolBeneficioSeeder;