const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const MarcaProducto = sequelize.define('marcaProducto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'marca_producto',
  timestamps: false
});

module.exports = MarcaProducto;