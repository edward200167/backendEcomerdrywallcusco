const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const CategoriaProducto = sequelize.define('categoriaProducto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'categoria_producto',
  timestamps: false
});

module.exports = CategoriaProducto;