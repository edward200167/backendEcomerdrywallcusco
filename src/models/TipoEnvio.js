const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const TipoEnvio = sequelize.define('TipoEnvio', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'tipos_envio',
  timestamps: true
});

module.exports = TipoEnvio;