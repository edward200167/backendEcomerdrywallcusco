const ConfigRuleta = require('../models/Config_ruleta');

const configRuletaSeeder = async () => {
  try {
    const ruletaData = [
      { 
        id: 1, 
        puntos_por_giro: 10, 
        max_giros_por_dia: 3, 
        estado: 'habilitada' 
      }
    ];

    const ruletaCreada = [];

    for (const ruletaConfig of ruletaData) {
      const existeRuleta = await ConfigRuleta.findByPk(ruletaConfig.id);
      
      if (!existeRuleta) {
        const nuevaRuleta = await ConfigRuleta.create(ruletaConfig);
        ruletaCreada.push(nuevaRuleta);
        console.log(`✅ Configuración de ruleta creada: ${ruletaConfig.puntos_por_giro} puntos por giro, máx ${ruletaConfig.max_giros_por_dia} giros/día (ID: ${ruletaConfig.id})`);
      } else {
        console.log(`ℹ️ Configuración de ruleta ya existe: ID ${existeRuleta.id}`);
      }
    }

    console.log('✅ Proceso de configuración de ruleta completado. Nuevos creados:', ruletaCreada.length);
    return ruletaCreada;
  } catch (error) {
    console.error('❌ Error al crear configuración de ruleta:', error);
    throw error;
  }
};

module.exports = configRuletaSeeder;