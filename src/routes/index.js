const express = require('express');
const createRoutes = require('./createRoutes');

const router = express.Router();

// Usar todas las rutas automáticas
router.use('/', createRoutes());

module.exports = router;
