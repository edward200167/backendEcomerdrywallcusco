const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigRolRequisito = sequelize.define('config_roles_requisitos', {
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad_minima: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'config_roles_requisitos',
  timestamps: true
});

module.exports = ConfigRolRequisito;