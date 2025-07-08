const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ConjuntoCarritoProducto = sequelize.define('conjuntoCarritoProducto', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.ENUM('carrito', 'pendiente', 'confirmado', 'rechazado'),
    allowNull: false,
    defaultValue: 'carrito'
  },
  // Información de envío
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  distrito: {
    type: DataTypes.STRING,
    allowNull: true
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referencia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipoEnvioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tipos_envio',
      key: 'id'
    }
  },
  // Información de facturación
  tipoComprobante: {
    type: DataTypes.ENUM('boleta', 'factura'),
    allowNull: true,
    defaultValue: 'boleta'
  },
  ruc: {
    type: DataTypes.STRING(11),
    allowNull: true,
    comment: 'RUC para facturación'
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Razón social para facturación'
  },
  informacionFactura: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Datos adicionales para factura: {direccionFiscal, etc}'
  },
  // Método de pago
  metodoPagoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'metodos_pago',
      key: 'id'
    }
  }
}, {
  tableName: 'conjunto_carrito_producto',
  timestamps: true
});

module.exports = ConjuntoCarritoProducto;