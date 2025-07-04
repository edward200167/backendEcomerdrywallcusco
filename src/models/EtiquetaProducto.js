const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const EtiquetaProducto = sequelize.define('etiquetaProducto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'etiqueta_producto',
  timestamps: false
}
);

module.exports = EtiquetaProducto;