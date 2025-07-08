const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const MetodoPago = sequelize.define('MetodoPago', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  urlImagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numeroReferencia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  opcional: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'metodos_pago',
  timestamps: true
});

module.exports = MetodoPago;