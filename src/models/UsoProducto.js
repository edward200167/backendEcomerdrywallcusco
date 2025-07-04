const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const UsoProducto = sequelize.define('usoProducto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'uso_producto',
  timestamps: false
});

module.exports = UsoProducto;