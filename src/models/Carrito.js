const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Carrito = sequelize.define('carrito', {
  cantidadProductosSoles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  cantidadProductosPuntos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalSoles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  totalPuntos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
 estado: {
    type: DataTypes.ENUM('carrito','pendiente', 'confirmado', 'rechazado'),
    defaultValue: 'carrito'
  }
}, {
  tableName: 'carritos',
  timestamps: true
});

module.exports = Carrito;
