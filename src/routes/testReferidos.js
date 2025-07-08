const express = require('express');
const router = express.Router();
const { Cupon } = require('../models');
const ReferralRewardService = require('../utils/referralRewardService');

// Ruta temporal para crear cupones de referidos
router.post('/setup-cupones-referidos', async (req, res) => {
  try {
    // Crear cupones de referidos
    const cupones = [
      {
        codigo: 'REFERIDO30',
        tipo_descuento: 'soles',
        valor: '30.00',
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      },
      {
        codigo: 'REFERIR50',
        tipo_descuento: 'soles',
        valor: '50.00',
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      }
    ];

    const creados = [];
    for (const cuponData of cupones) {
      const [cupon, created] = await Cupon.findOrCreate({
        where: { codigo: cuponData.codigo },
        defaults: cuponData
      });
      
      if (created) {
        creados.push(cupon);
      }
    }

    // Aplicar recompensas
    await ReferralRewardService.checkAndAssignReferralRewards(1); // Juan
    await ReferralRewardService.checkAndAssignReferralRewards(2); // Constructora

    res.json({
      message: 'Cupones de referidos configurados',
      cuponesCreados: creados.length,
      recompensasAplicadas: true
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta más simple que solo aplica recompensas
router.post('/aplicar-recompensas', async (req, res) => {
  try {
    // Aplicar recompensas
    await ReferralRewardService.checkAndAssignReferralRewards(1); // Juan
    await ReferralRewardService.checkAndAssignReferralRewards(2); // Constructora

    res.json({
      message: 'Recompensas aplicadas',
      usuariosVerificados: [1, 2]
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear solo los cupones
router.post('/crear-cupones', async (req, res) => {
  try {
    const cupones = [
      {
        codigo: 'REFERIDO30',
        tipo_descuento: 'soles',
        valor: '30.00',
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      },
      {
        codigo: 'REFERIR50',
        tipo_descuento: 'soles',
        valor: '50.00',
        fecha_inicio: new Date('2025-01-01'),
        fecha_fin: new Date('2025-12-31'),
        max_uso: 1,
        usado: 0,
        activo: true
      }
    ];

    const resultados = [];
    for (const cuponData of cupones) {
      try {
        const [cupon, created] = await Cupon.findOrCreate({
          where: { codigo: cuponData.codigo },
          defaults: cuponData
        });
        
        resultados.push({
          codigo: cupon.codigo,
          id: cupon.id,
          created,
          status: 'success'
        });
      } catch (cuponError) {
        console.error(`Error creando cupón ${cuponData.codigo}:`, cuponError);
        resultados.push({
          codigo: cuponData.codigo,
          status: 'error',
          error: cuponError.message,
          details: cuponError.errors || cuponError.original || cuponError
        });
      }
    }

    res.json({
      message: 'Cupones procesados',
      cupones: resultados
    });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.errors || []
    });
  }
});

// Ruta para insertar cupones con SQL directo
router.post('/insertar-cupones-sql', async (req, res) => {
  try {
    const sequelize = require('../utils/connection');
    
    const query = `
      INSERT INTO cupones (codigo, tipo_descuento, valor, fecha_inicio, fecha_fin, max_uso, usado, activo, "createdAt", "updatedAt")
      VALUES 
        ('REFERIDO30', 'puntos', 30.00, '2025-01-01', '2025-12-31', 1, 0, true, NOW(), NOW()),
        ('REFERIR50', 'puntos', 50.00, '2025-01-01', '2025-12-31', 1, 0, true, NOW(), NOW())
      ON CONFLICT (codigo) DO NOTHING
      RETURNING *;
    `;
    
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });
    
    res.json({
      message: 'Cupones insertados con SQL',
      cupones: result
    });
  } catch (error) {
    console.error('Error SQL:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;