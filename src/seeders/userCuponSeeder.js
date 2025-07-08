const { UserCupon } = require('../models');

const userCuponSeeder = async () => {
  try {
    await UserCupon.bulkCreate([
      {
        userId: 1,
        cuponId: 1,
        fechaUso: new Date('2024-01-15'),
        montoDescuento: 25.00
      },
      {
        userId: 1,
        cuponId: 2,
        fechaUso: new Date('2024-02-20'),
        montoDescuento: 50.00
      },
      {
        userId: 2,
        cuponId: 1,
        fechaUso: new Date('2024-01-18'),
        montoDescuento: 25.00
      },
      {
        userId: 2,
        cuponId: 3,
        fechaUso: new Date('2024-03-10'),
        montoDescuento: 15.00
      },
      {
        userId: 3,
        cuponId: 2,
        fechaUso: new Date('2024-02-25'),
        montoDescuento: 50.00
      }
    ]);
    console.log('✅ User-Cupón seeder ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error en userCuponSeeder:', error);
  }
};

module.exports = userCuponSeeder;