const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const CodigoReferido = sequelize.define('codigo_referido', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'codigo_referido',
  timestamps: true
});

module.exports = CodigoReferido;