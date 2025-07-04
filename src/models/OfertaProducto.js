const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const OfertaProducto = sequelize.define('ofertaProducto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipoDescuento: {
    type: DataTypes.ENUM('soles', 'porcentaje'),
    allowNull: false
  },
  valorDescuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  compraMinima: {
    type: DataTypes.DECIMAL(10, 2), // en soles
    allowNull: true
  },
  descuentoMaximoCliente: {
    type: DataTypes.DECIMAL(10, 2), // en soles
    allowNull: true
  },
  aplicaPara: {
    type: DataTypes.ENUM('cliente', 'empresa', 'ambos'),
    defaultValue: 'ambos'
  },
  estado: {
    type: DataTypes.ENUM('activa', 'inactiva', 'expirada'),
    defaultValue: 'activa'
  }
}, {
  tableName: 'ofertas_productos',
  timestamps: true
});

module.exports = OfertaProducto;