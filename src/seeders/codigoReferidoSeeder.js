const CodigoReferido = require('../models/CodigoReferido');

const codigoReferidoSeeder = async () => {
  try {
    // Obtener usuarios existentes para usar IDs válidos
    const { User } = require('../models/index');
    const usuariosExistentes = await User.findAll({ attributes: ['id'], limit: 5 });
    
    if (usuariosExistentes.length === 0) {
      console.log('⚠️ No hay usuarios existentes, saltando códigos de referido');
      return [];
    }
    
    const codigosData = usuariosExistentes.map((usuario, index) => ({
      id: index + 1,
      codigo: `REF${String(usuario.id).padStart(3, '0')}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      usuario_id: usuario.id,
      usado: index % 3 === 0 // Algunos códigos marcados como usados
    }));

    const codigosCreados = [];

    for (const codigoData of codigosData) {
      const existeCodigo = await CodigoReferido.findByPk(codigoData.id);
      
      if (!existeCodigo) {
        const nuevoCodigo = await CodigoReferido.create(codigoData);
        codigosCreados.push(nuevoCodigo);
        console.log(`✅ Código de referido creado: ${codigoData.codigo} para usuario ${codigoData.usuario_id} (ID: ${codigoData.id})`);
      } else {
        console.log(`ℹ️ Código de referido ya existe: ID ${existeCodigo.id}`);
      }
    }

    console.log('✅ Proceso de códigos de referido completado. Nuevos creados:', codigosCreados.length);
    return codigosCreados;
  } catch (error) {
    console.error('❌ Error al crear códigos de referido:', error);
    throw error;
  }
};

module.exports = codigoReferidoSeeder;