const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ImagenesProducto = sequelize.define('imagenesProducto', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
  tableName: 'imagenes_producto',
  timestamps: false
});

module.exports = ImagenesProducto;