const express = require('express');
const router = express.Router();
const cuponController = require('../controllers/cuponController');
const verifyJWT = require('../utils/verifyJWT');

// Rutas para generar cupones (protegidas - solo admin)
router.post('/generate/percentage', verifyJWT, cuponController.generatePercentageCupon);
router.post('/generate/soles', verifyJWT, cuponController.generateSolesCupon);
router.post('/generate/custom', verifyJWT, cuponController.generateCustomCupon);
router.post('/generate/ruleta', verifyJWT, cuponController.generateRuletaCupon);

// Rutas para usar cupones (públicas para clientes)
router.get('/validate/:codigo', cuponController.validateCupon);
router.post('/apply/:codigo', cuponController.applyCupon);

module.exports = router;