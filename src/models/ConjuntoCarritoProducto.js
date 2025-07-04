const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConjuntoCarritoProducto = sequelize.define('conjuntoCarritoProducto', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.ENUM('carrito', 'pendiente', 'confirmado', 'rechazado'),
    allowNull: false,
    defaultValue: 'carrito'
  }
}, {
  tableName: 'conjunto_carrito_producto',
  timestamps: true
});

module.exports = ConjuntoCarritoProducto;