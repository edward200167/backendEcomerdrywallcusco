const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Producto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioLiquidacion: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  urlImg3D: {
    type: DataTypes.STRING,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  puntos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  espesor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dimensiones: {
    type: DataTypes.STRING,
    allowNull: true
  },
  peso: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resistenciaFuego: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fechaInicioLiquidacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fechaFinLiquidacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hastaAcabarStock: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  // Claves foráneas
  unidadProductoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'unidad_producto',
      key: 'id'
    }
  },
  categoriaProductoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categoria_producto',
      key: 'id'
    }
  },
  marcaProductoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'marca_producto',
      key: 'id'
    }
  },
  motivoLiquidacionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'motivacion_liquidacion',
      key: 'id'
    }
  },
  usoProductoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'uso_producto',
      key: 'id'
    }
  }
}, {
  tableName: 'productos',
  timestamps: true
});

module.exports = Producto;
