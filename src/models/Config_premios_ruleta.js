const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConfigPremiosRuleta = sequelize.define('config_ruleta_premios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('cupon', 'producto', 'puntos', 'sin_premio'),
    allowNull: false
  },
  codigo_cupon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cantidad_puntos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  probabilidad: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FF6B6B'
  }
}, {
  tableName: 'config_ruleta_premios',
  timestamps: true
});

module.exports = ConfigPremiosRuleta;
