const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigRolBeneficio = sequelize.define('config_roles_beneficios', {
  rol: {
    type: DataTypes.ENUM('cliente', 'empresarial'),
    allowNull: false
  },
  descuento_empresarial: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00 // por ejemplo, 5.00 representa 5%
  },
  envio_gratis_desde: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'config_roles_beneficios',
  timestamps: true
});

module.exports = ConfigRolBeneficio;