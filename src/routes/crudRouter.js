const express = require('express');

/**
 * Genera un router CRUD para un controlador.
 * @param {object} controller - El controlador con métodos: getAll, getOne, create, update, remove
 * @returns {express.Router}
 */
function generateCrudRoutes(controller) {
  const router = express.Router();

  router.route('/')
    .get(controller.getAll)
    .post(controller.create);

  router.route('/:id')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.remove);

  return router;
}

module.exports = generateCrudRoutes;
