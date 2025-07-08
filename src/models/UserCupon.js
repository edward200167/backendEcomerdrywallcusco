const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const UserCupon = sequelize.define('userCupon', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  cuponId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cupones',
      key: 'id'
    }
  },
  fechaUso: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  montoDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Monto exacto del descuento aplicado'
  }
}, {
  tableName: 'user_cupones',
  timestamps: true
});

module.exports = UserCupon;