const { validateUserForBusinessRole, autoUpgradeUserRole } = require('../utils/roleValidator');
const { getRoleBenefits, calculateCartBenefits } = require('../utils/benefitsCalculator');
const { ConfigRolRequisito, ConfigRolBeneficio } = require('../models');
const catchError = require('../utils/catchError');

const validateRole = catchError(async (req, res) => {
  const { userId } = req.params;
  
  const validation = await validateUserForBusinessRole(userId);
  
  res.json({
    success: true,
    data: validation
  });
});

const upgradeRole = catchError(async (req, res) => {
  const { userId } = req.params;
  
  const result = await autoUpgradeUserRole(userId);
  
  res.json({
    success: true,
    data: result
  });
});

const getRoleRequirements = catchError(async (req, res) => {
  const requirements = await ConfigRolRequisito.findAll({
    where: { activo: true },
    include: [{
      model: require('../models').Producto,
      as: 'producto',
      attributes: ['id', 'nombre', 'precio']
    }]
  });
  
  res.json({
    success: true,
    data: requirements
  });
});

const getRoleBenefitsController = catchError(async (req, res) => {
  const { rol } = req.params;
  
  const benefits = await getRoleBenefits(rol);
  
  res.json({
    success: true,
    data: benefits
  });
});

const calculateCartBenefitsController = catchError(async (req, res) => {
  const { rol } = req.params;
  const { items } = req.body;
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      message: 'Se requiere un array de items'
    });
  }
  
  const benefits = await calculateCartBenefits(items, rol);
  
  res.json({
    success: true,
    data: benefits
  });
});

const createRoleRequirement = catchError(async (req, res) => {
  const { producto_id, cantidad_minima, activo = true } = req.body;
  
  const requirement = await ConfigRolRequisito.create({
    producto_id,
    cantidad_minima,
    activo
  });
  
  res.status(201).json({
    success: true,
    data: requirement
  });
});

const updateRoleRequirement = catchError(async (req, res) => {
  const { id } = req.params;
  const { producto_id, cantidad_minima, activo } = req.body;
  
  const requirement = await ConfigRolRequisito.findByPk(id);
  
  if (!requirement) {
    return res.status(404).json({
      success: false,
      message: 'Requisito no encontrado'
    });
  }
  
  await requirement.update({
    producto_id,
    cantidad_minima,
    activo
  });
  
  res.json({
    success: true,
    data: requirement
  });
});

const createRoleBenefit = catchError(async (req, res) => {
  const { rol, descuento_empresarial, envio_gratis_desde, habilitado = true } = req.body;
  
  const benefit = await ConfigRolBeneficio.create({
    rol,
    descuento_empresarial,
    envio_gratis_desde,
    habilitado
  });
  
  res.status(201).json({
    success: true,
    data: benefit
  });
});

const updateRoleBenefit = catchError(async (req, res) => {
  const { id } = req.params;
  const { rol, descuento_empresarial, envio_gratis_desde, habilitado } = req.body;
  
  const benefit = await ConfigRolBeneficio.findByPk(id);
  
  if (!benefit) {
    return res.status(404).json({
      success: false,
      message: 'Beneficio no encontrado'
    });
  }
  
  await benefit.update({
    rol,
    descuento_empresarial,
    envio_gratis_desde,
    habilitado
  });
  
  res.json({
    success: true,
    data: benefit
  });
});

module.exports = {
  validateRole,
  upgradeRole,
  getRoleRequirements,
  getRoleBenefitsController,
  calculateCartBenefitsController,
  createRoleRequirement,
  updateRoleRequirement,
  createRoleBenefit,
  updateRoleBenefit
};