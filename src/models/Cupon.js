const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cupon = sequelize.define('cupon', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo_descuento: {
    type: DataTypes.ENUM('porcentaje', 'soles', 'puntos'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  max_uso: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  usado: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cupones',
  timestamps: true
});

module.exports = Cupon;