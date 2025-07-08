const { User } = require('../models');

/**
 * Generador de códigos de referido únicos
 */
class CodigoGenerator {
  
  /**
   * Genera un código aleatorio
   * @param {number} length - Longitud del código
   * @returns {string} Código generado
   */
  static generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'REF';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Genera un código único verificando que no exista en BD
   * @param {number} length - Longitud del código (sin contar REF)
   * @returns {Promise<string>} Código único garantizado
   */
  static async generateUniqueCode(length = 8) {
    let code;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 20;

    while (exists && attempts < maxAttempts) {
      code = this.generateCode(length);
      const existingUser = await User.findOne({ where: { codigoReferido: code } });
      exists = !!existingUser;
      attempts++;
    }

    if (exists) {
      throw new Error('No se pudo generar un código único después de varios intentos');
    }

    return code;
  }

  /**
   * Valida si un código de referido existe
   * @param {string} codigo - Código a validar
   * @returns {Promise<Object>} Usuario que tiene ese código o null
   */
  static async validateReferralCode(codigo) {
    if (!codigo) return null;
    
    const user = await User.findOne({ 
      where: { codigoReferido: codigo },
      attributes: ['id', 'nombre', 'codigoReferido']
    });

    return user;
  }
}

module.exports = CodigoGenerator;