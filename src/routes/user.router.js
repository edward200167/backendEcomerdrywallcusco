const express = require('express');
const userController = require('../controllers/user.controller');
const generateCrudRoutes = require('./crudRouter');

const router = express.Router();

// 🔐 Rutas personalizadas
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.create); // Este ya tiene validación y hash

// ♻️ Rutas CRUD reutilizables (getAll, getOne, update, remove)
const crudRoutes = generateCrudRoutes(userController);
router.use('/', crudRoutes); // aplica para: GET /, GET /:id, PUT /:id, DELETE /:id

module.exports = router;
