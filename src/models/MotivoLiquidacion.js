const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const MotivacionLiquidacion = sequelize.define('motivacionLiquidacion', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
  tableName: 'motivacion_liquidacion',
  timestamps: false
});

module.exports = MotivacionLiquidacion;