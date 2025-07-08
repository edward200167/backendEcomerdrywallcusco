const ConfigPremiosRuleta = require('../models/Config_premios_ruleta');

const configPremiosRuletaSeeder = async () => {
  try {
    // Obtener un producto existente para el premio
    const { Producto } = require('../models/index');
    const primerProducto = await Producto.findOne({ attributes: ['id'] });
    
    const premiosData = [
      { 
        id: 1, 
        nombre: 'Sin Premio', 
        tipo: 'sin_premio', 
        probabilidad: 0.4000, 
        activo: true,
        color: '#9E9E9E'
      },
      { 
        id: 2, 
        nombre: '10 Puntos', 
        tipo: 'puntos', 
        cantidad_puntos: 10, 
        probabilidad: 0.2500, 
        activo: true,
        color: '#4CAF50'
      },
      { 
        id: 3, 
        nombre: '50 Puntos', 
        tipo: 'puntos', 
        cantidad_puntos: 50, 
        probabilidad: 0.1500, 
        activo: true,
        color: '#2196F3'
      },
      { 
        id: 4, 
        nombre: '100 Puntos', 
        tipo: 'puntos', 
        cantidad_puntos: 100, 
        probabilidad: 0.1000, 
        activo: true,
        color: '#FF9800'
      },
      { 
        id: 5, 
        nombre: 'Cupón 5%', 
        tipo: 'cupon', 
        codigo_cupon: 'RULETA5', 
        probabilidad: 0.0700, 
        activo: true,
        color: '#9C27B0'
      },
      { 
        id: 6, 
        nombre: 'Cupón 10%', 
        tipo: 'cupon', 
        codigo_cupon: 'RULETA10', 
        probabilidad: 0.0200, 
        activo: true,
        color: '#E91E63'
      },
      { 
        id: 7, 
        nombre: 'Producto Gratis', 
        tipo: 'producto', 
        producto_id: primerProducto ? primerProducto.id : null,
        probabilidad: 0.0100, 
        activo: true,
        color: '#FFD700'
      }
    ];

    const premiosCreados = [];

    for (const premioData of premiosData) {
      const existePremio = await ConfigPremiosRuleta.findByPk(premioData.id);
      
      if (!existePremio) {
        const nuevoPremio = await ConfigPremiosRuleta.create(premioData);
        premiosCreados.push(nuevoPremio);
        console.log(`✅ Premio ruleta creado: ${premioData.nombre} (ID: ${premioData.id})`);
      } else {
        console.log(`ℹ️ Premio ruleta ya existe: ${existePremio.nombre} (ID: ${existePremio.id})`);
      }
    }

    console.log('✅ Proceso de premios ruleta completado. Nuevos creados:', premiosCreados.length);
    return premiosCreados;
  } catch (error) {
    console.error('❌ Error al crear premios de ruleta:', error);
    throw error;
  }
};

module.exports = configPremiosRuletaSeeder;