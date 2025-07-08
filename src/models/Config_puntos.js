const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigPuntos = sequelize.define('config_puntos', {
  valor_soles_por_punto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  min_ganancia_puntos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_ganancia_puntos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntos_por_referido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntos_por_ser_referido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  compra_min_para_referir: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  compra_min_para_ser_referido: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'config_puntos',
  timestamps: true
});

module.exports = ConfigPuntos;
