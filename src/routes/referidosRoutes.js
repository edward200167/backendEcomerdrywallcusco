const express = require('express');
const router = express.Router();
const { User, ConjuntoCarritoProducto } = require('../models');
const verifyJWT = require('../utils/verifyJWT');

// Ver mis referidos (quién usó mi código)
router.get('/mis-referidos', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    
    if (!user || !user.codigoReferido) {
      return res.json({ 
        message: 'No tienes código de referido',
        referidos: []
      });
    }

    // Buscar usuarios que usaron mi código
    const referidos = await User.findAll({
      where: { 
        codigoQueLoReferio: user.codigoReferido 
      },
      attributes: ['id', 'nombre', 'correoElectronico', 'createdAt', 'puntos'],
      include: [{
        association: 'conjuntosCarrito',
        where: { estado: 'confirmado' },
        required: false,
        include: [{
          association: 'items',
          attributes: ['totalSoles']
        }]
      }]
    });

    // Calcular estadísticas de cada referido
    const referidosConStats = referidos.map(referido => {
      const totalCompras = referido.conjuntosCarrito.reduce((total, conjunto) => {
        const totalConjunto = conjunto.items.reduce((sum, item) => {
          return sum + parseFloat(item.totalSoles || 0);
        }, 0);
        return total + totalConjunto;
      }, 0);

      return {
        id: referido.id,
        nombre: referido.nombre,
        correoElectronico: referido.correoElectronico,
        fechaRegistro: referido.createdAt,
        puntos: referido.puntos,
        totalCompras: totalCompras,
        numeroCompras: referido.conjuntosCarrito.length,
        estado: totalCompras >= 50 ? 'activo' : 'pendiente'
      };
    });

    res.json({
      miCodigo: user.codigoReferido,
      totalReferidos: referidos.length,
      referidosActivos: referidosConStats.filter(r => r.estado === 'activo').length,
      referidos: referidosConStats
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ver estadísticas de referidos
router.get('/estadisticas-referidos', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    
    if (!user || !user.codigoReferido) {
      return res.json({ 
        message: 'No tienes código de referido'
      });
    }

    const referidos = await User.findAll({
      where: { 
        codigoQueLoReferio: user.codigoReferido 
      },
      include: [{
        association: 'conjuntosCarrito',
        where: { estado: 'confirmado' },
        required: false,
        include: [{
          association: 'items',
          attributes: ['totalSoles']
        }]
      }]
    });

    let totalGenerado = 0;
    let referidosActivos = 0;
    let puntosGanados = 0;

    referidos.forEach(referido => {
      const totalCompras = referido.conjuntosCarrito.reduce((total, conjunto) => {
        const totalConjunto = conjunto.items.reduce((sum, item) => {
          return sum + parseFloat(item.totalSoles || 0);
        }, 0);
        return total + totalConjunto;
      }, 0);

      totalGenerado += totalCompras;
      
      if (totalCompras >= 50) {
        referidosActivos++;
        puntosGanados += 50; // puntos por referir
      }
    });

    res.json({
      miCodigo: user.codigoReferido,
      resumen: {
        totalReferidos: referidos.length,
        referidosActivos,
        totalGenerado: totalGenerado.toFixed(2),
        puntosGanados,
        promedioComprasPorReferido: referidos.length > 0 ? (totalGenerado / referidos.length).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ver quién me refirió
router.get('/quien-me-refirio', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    
    if (!user || !user.codigoQueLoReferio) {
      return res.json({ 
        message: 'No fuiste referido por nadie'
      });
    }

    // Buscar quién me refirió
    const referidor = await User.findOne({
      where: { 
        codigoReferido: user.codigoQueLoReferio 
      },
      attributes: ['id', 'nombre', 'correoElectronico', 'codigoReferido']
    });

    res.json({
      fuiReferidoPor: referidor ? {
        nombre: referidor.nombre,
        correoElectronico: referidor.correoElectronico,
        codigoReferido: referidor.codigoReferido
      } : null,
      miCodigoQueUse: user.codigoQueLoReferio
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;