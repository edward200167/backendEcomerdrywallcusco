const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigRuleta = sequelize.define('config_ruleta', {
  puntos_por_giro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_giros_por_dia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('habilitada', 'deshabilitada'),
    allowNull: false,
    defaultValue: 'habilitada'
  }
}, {
  tableName: 'config_ruleta',
  timestamps: true
});

module.exports = ConfigRuleta;
