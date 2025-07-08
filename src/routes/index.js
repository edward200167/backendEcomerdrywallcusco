const express = require('express');
const createRoutes = require('./createRoutes');
const roleRoutes = require('./roleRoutes');
const uploadRoutes = require('./uploadRoutes');
const cuponRoutes = require('./cuponRoutes');
const testReferidos = require('./testReferidos');
const referidosRoutes = require('./referidosRoutes');

const router = express.Router();

// Rutas específicas
router.use('/roles', roleRoutes);
router.use('/upload', uploadRoutes);
router.use('/cupones-custom', cuponRoutes);
router.use('/test', testReferidos);
router.use('/referidos', referidosRoutes);

// Usar todas las rutas automáticas
router.use('/', createRoutes());

module.exports = router;
