const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const CarritoProducto = sequelize.define('CarritoProducto', {
  conjuntoCarritoProductoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'conjunto_carrito_producto',
      key: 'id'
    }
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    }
  },
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
  }
}, {
  tableName: 'carrito_producto',
  timestamps: true
});

module.exports = CarritoProducto;