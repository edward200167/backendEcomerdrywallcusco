const MotivacionLiquidacion = require('../models/MotivoLiquidacion');

const motivoLiquidacionSeeder = async () => {
  try {
    const motivosData = [
      { id: 1, nombre: 'Vencimiento Próximo' },
      { id: 2, nombre: 'SobreStock' },
      { id: 3, nombre: 'Producto Descontinuado' },
      { id: 4, nombre: 'Daño Menor' },
      { id: 5, nombre: 'Cambio de Modelo' },
      { id: 6, nombre: 'Otros' }
    ];

    const motivosCreados = [];

    for (const motivoData of motivosData) {
      const existeMotivo = await MotivacionLiquidacion.findByPk(motivoData.id);
      
      if (!existeMotivo) {
        const nuevoMotivo = await MotivacionLiquidacion.create(motivoData);
        motivosCreados.push(nuevoMotivo);
        console.log(`✅ Motivo creado: ${motivoData.nombre} (ID: ${motivoData.id})`);
      } else {
        console.log(`ℹ️ Motivo ya existe: ${existeMotivo.nombre} (ID: ${existeMotivo.id})`);
      }
    }

    console.log('✅ Proceso de motivos completado. Nuevos creados:', motivosCreados.length);
    return motivosCreados;
  } catch (error) {
    console.error('❌ Error al crear motivos de liquidación:', error);
    throw error;
  }
};

module.exports = motivoLiquidacionSeeder;