const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // Desactivar logs SQL
  define: {
    underscored: false,
    freezeTableName: true,
    timestamps: true
  }
})

module.exports = sequelize;