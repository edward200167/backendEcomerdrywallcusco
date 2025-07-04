const VolumenDescuento = require('../models/VolumenDescuento');

const volumenDescuentoSeeder = async () => {
  try {
    const descuentosData = [
      {
        id: 1,
        cantidadMin: 60,
        porcentaje: 6
      },
      {
        id: 2,
        cantidadMin: 80,
        porcentaje: 10
      },
      {
        id: 3,
        cantidadMin: 40,
        porcentaje: 5
      },
      {
        id: 4,
        cantidadMin: 900,
        porcentaje: 12
      }
    ];

    const descuentosCreados = [];

    for (const descuentoData of descuentosData) {
      const existeDescuento = await VolumenDescuento.findByPk(descuentoData.id);
      
      if (!existeDescuento) {
        const nuevoDescuento = await VolumenDescuento.create(descuentoData);
        descuentosCreados.push(nuevoDescuento);
        console.log(`✅ Descuento creado: ${descuentoData.cantidadMin} min, ${descuentoData.porcentaje}% (ID: ${descuentoData.id})`);
      } else {
        console.log(`ℹ️ Descuento ya existe: ${existeDescuento.cantidadMin} min, ${existeDescuento.porcentaje}% (ID: ${existeDescuento.id})`);
      }
    }

    console.log('✅ Proceso de descuentos completado. Nuevos creados:', descuentosCreados.length);
    return descuentosCreados;
  } catch (error) {
    console.error('❌ Error al crear descuentos por volumen:', error);
    throw error;
  }
};

module.exports = volumenDescuentoSeeder;