const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            len: [8, 8]
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'cliente', 'empresa'),
        allowNull: false,
        defaultValue: 'cliente'
    },
    codigoReferido: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    aceptoTerminos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [11, 11] // RUC peruano = 11 dígitos
        }
    },
    nombreEmpresa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    puntos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

// Oculta contraseña al hacer JSON
User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.contraseña;
    return values;
};

module.exports = User;
