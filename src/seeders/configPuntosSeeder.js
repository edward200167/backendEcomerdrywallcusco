const ConfigPuntos = require('../models/Config_puntos');

const configPuntosSeeder = async () => {
  try {
    const puntosData = [
      { 
        id: 1, 
        valor_soles_por_punto: 0.50, 
        min_ganancia_puntos: 1, 
        max_ganancia_puntos: 100, 
        puntos_por_referido: 50,
        puntos_por_ser_referido: 30,
        compra_min_para_referir: 100.00,
        compra_min_para_ser_referido: 50.00
      }
    ];

    const puntosCreados = [];

    for (const puntoData of puntosData) {
      const existePunto = await ConfigPuntos.findByPk(puntoData.id);
      
      if (!existePunto) {
        const nuevoPunto = await ConfigPuntos.create(puntoData);
        puntosCreados.push(nuevoPunto);
        console.log(`✅ Configuración de puntos creada: S/.${puntoData.valor_soles_por_punto} por punto (ID: ${puntoData.id})`);
      } else {
        console.log(`ℹ️ Configuración de puntos ya existe: ID ${existePunto.id}`);
      }
    }

    console.log('✅ Proceso de configuración de puntos completado. Nuevos creados:', puntosCreados.length);
    return puntosCreados;
  } catch (error) {
    console.error('❌ Error al crear configuración de puntos:', error);
    throw error;
  }
};

module.exports = configPuntosSeeder;