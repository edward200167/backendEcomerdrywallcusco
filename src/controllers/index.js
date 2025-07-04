const fs = require('fs');
const path = require('path');
const createController = require('./createController');

const controllers = {};
const modelsPath = path.join(__dirname, '../models');

// Auto-registrar todos los modelos
fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const modelName = file.replace('.js', '');
    const controllerName = modelName.toLowerCase();
    controllers[controllerName] = createController(modelName);
  });

// Sobrescribir controladores personalizados
controllers.user = require('./user.controller');

module.exports = controllers;