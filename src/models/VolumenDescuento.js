const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const VolumenDescuento = sequelize.define('volumenDescuento', {
    cantidadMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
  tableName: 'volumen_descuentos',
  timestamps: false
});

module.exports = VolumenDescuento;