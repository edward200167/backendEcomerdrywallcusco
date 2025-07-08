const ConfigSorteos = require('../models/Config_sorteos');

const configSorteosSeeder = async () => {
  try {
    const sorteosData = [
      { 
        id: 1, 
        puntos_por_boleto: 20, 
        boletos_max_por_mes: 10, 
        puntos_min_para_boleto_gratis: 500 
      }
    ];

    const sorteosCreados = [];

    for (const sorteoData of sorteosData) {
      const existeSorteo = await ConfigSorteos.findByPk(sorteoData.id);
      
      if (!existeSorteo) {
        const nuevoSorteo = await ConfigSorteos.create(sorteoData);
        sorteosCreados.push(nuevoSorteo);
        console.log(`✅ Configuración de sorteos creada: ${sorteoData.puntos_por_boleto} puntos/boleto, máx ${sorteoData.boletos_max_por_mes} boletos/mes (ID: ${sorteoData.id})`);
      } else {
        console.log(`ℹ️ Configuración de sorteos ya existe: ID ${existeSorteo.id}`);
      }
    }

    console.log('✅ Proceso de configuración de sorteos completado. Nuevos creados:', sorteosCreados.length);
    return sorteosCreados;
  } catch (error) {
    console.error('❌ Error al crear configuración de sorteos:', error);
    throw error;
  }
};

module.exports = configSorteosSeeder;