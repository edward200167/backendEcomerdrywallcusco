const express = require('express');
const controllers = require('../controllers');
const generateCrudRoutes = require('./crudRouter');

const createRoutes = () => {
  const router = express.Router();

  // Rutas automáticas para todos los controladores
  Object.keys(controllers).forEach(controllerName => {
    const controller = controllers[controllerName];
    
    // Crear ruta basada en el nombre del controlador
    let routePath = `/${controllerName}`;
    
    // Casos especiales para nombres más amigables
    const routeMap = {
      'categoriaproducto': '/categorias',
      'imagenesproductos': '/imagenes',
      'marcaproducto': '/marcas',
      'motivoliquidacion': '/motivos-liquidacion',
      'producto': '/productos',
      'unidadproducto': '/unidades',
      'usoproducto': '/usos',
      'volumendescuento': '/descuentos',
      'etiquetaproducto': '/etiquetas',
      'ofertaproducto': '/ofertas',
      'user': '/users',
      'conjuntocarritoproducto': '/carrito',
      'carritoproducto': '/carrito-items'
    };
    
    routePath = routeMap[controllerName] || routePath;
    
    // Generar rutas CRUD
    router.use(routePath, generateCrudRoutes(controller));
  });

  // Rutas especiales para User (login, logout)
  router.post('/users/login', controllers.user.login);
  router.post('/users/logout', controllers.user.logout);

  return router;
};

module.exports = createRoutes;