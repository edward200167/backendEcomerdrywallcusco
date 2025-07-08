const bcrypt = require('bcrypt');
const User = require('../models/User');

const userSeeder = async () => {
  try {
    const usersData = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        correoElectronico: 'juan.perez@email.com',
        contraseña: await bcrypt.hash('demo123', 10),
        dni: '12345678',
        telefono: '987654321',
        rol: 'cliente',
        codigoReferido: 'REF789012',
        codigoQueLoReferio: null, // No fue referido por nadie
        puntos: 2340,
        aceptoTerminos: true
      },
      {
        id: 2,
        nombre: 'Constructora Cusco SAC',
        correoElectronico: 'constructora.cusco@email.com',
        contraseña: await bcrypt.hash('demo123', 10),
        telefono: '984123456',
        rol: 'empresarial',
        codigoReferido: 'REF123456',
        codigoQueLoReferio: 'REF789012', // Referido por Juan Pérez
        puntos: 15420,
        ruc: '20123456789',
        nombreEmpresa: 'Constructora Cusco SAC',
        aceptoTerminos: true
      },
      {
        id: 3,
        nombre: 'Administrador',
        correoElectronico: 'admin@drywallcusco.com',
        contraseña: await bcrypt.hash('admin123', 10),
        dni: '77777777',
        telefono: '999888777',
        rol: 'admin',
        codigoReferido: 'ADMIN001',
        codigoQueLoReferio: null, // Admin no fue referido
        puntos: 4000,
        aceptoTerminos: true
      }
    ];

    const usersCreados = [];

    for (const userData of usersData) {
      const existeUser = await User.findByPk(userData.id);
      
      if (!existeUser) {
        const nuevoUser = await User.create(userData);
        usersCreados.push(nuevoUser);
        console.log(`✅ Usuario creado: ${userData.nombre} (ID: ${userData.id})`);
      } else {
        console.log(`ℹ️ Usuario ya existe: ${existeUser.nombre} (ID: ${existeUser.id})`);
      }
    }

    console.log('✅ Proceso de usuarios completado. Nuevos creados:', usersCreados.length);
    return usersCreados;
  } catch (error) {
    console.error('❌ Error al crear usuarios:', error);
    throw error;
  }
};

module.exports = userSeeder;