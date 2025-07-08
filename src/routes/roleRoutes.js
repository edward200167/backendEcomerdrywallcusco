const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const verifyJWT = require('../utils/verifyJWT');

console.log('🔧 roleController loaded:', Object.keys(roleController));

// Rutas para validación y upgrade de roles
router.get('/validate/:userId', verifyJWT, roleController.validateRole);
router.post('/upgrade/:userId', verifyJWT, roleController.upgradeRole);

// Ruta de prueba sin JWT
router.get('/test', (req, res) => {
  res.json({ message: 'Role routes working!', timestamp: new Date() });
});

// Rutas para obtener requisitos y beneficios
router.get('/requirements', roleController.getRoleRequirements);
router.get('/benefits/:rol', roleController.getRoleBenefitsController);

// Ruta para calcular beneficios de carrito
router.post('/calculate-benefits/:rol', roleController.calculateCartBenefitsController);

// Rutas administrativas para requisitos (protegidas)
router.post('/requirements', verifyJWT, roleController.createRoleRequirement);
router.put('/requirements/:id', verifyJWT, roleController.updateRoleRequirement);

// Rutas administrativas para beneficios (protegidas)
router.post('/benefits', verifyJWT, roleController.createRoleBenefit);
router.put('/benefits/:id', verifyJWT, roleController.updateRoleBenefit);

module.exports = router;