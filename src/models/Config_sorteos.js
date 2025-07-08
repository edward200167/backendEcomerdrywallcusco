const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigSorteos = sequelize.define('config_sorteos', {
  puntos_por_boleto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  boletos_max_por_mes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntos_min_para_boleto_gratis: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'config_sorteos',
  timestamps: true
});

module.exports = ConfigSorteos;
