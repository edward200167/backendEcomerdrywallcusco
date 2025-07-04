const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const UnidadProducto = sequelize.define('unidadProducto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'unidad_producto',
  timestamps: false
});

module.exports = UnidadProducto;