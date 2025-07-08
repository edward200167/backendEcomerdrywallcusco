const { Cupon } = require('../models');

/**
 * Generador de cupones únicos
 */
class CuponGenerator {
  
  /**
   * Genera un código aleatorio único
   * @param {number} length - Longitud del código
   * @returns {string} Código único
   */
  static generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Genera un código único verificando que no exista en BD
   * @param {number} length - Longitud del código
   * @returns {Promise<string>} Código único garantizado
   */
  static async generateUniqueCode(length = 8) {
    let code;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (exists && attempts < maxAttempts) {
      code = this.generateCode(length);
      const existingCupon = await Cupon.findOne({ where: { codigo: code } });
      exists = !!existingCupon;
      attempts++;
    }

    if (exists) {
      throw new Error('No se pudo generar un código único después de varios intentos');
    }

    return code;
  }

  /**
   * Crea un cupón de descuento porcentual
   * @param {number} porcentaje - Porcentaje de descuento (ej: 10 para 10%)
   * @param {Object} options - Opciones adicionales
   */
  static async createPercentageCupon(porcentaje, options = {}) {
    const {
      fechaInicio = null,
      fechaFin = null,
      descripcion = `${porcentaje}% de descuento`,
      maxUso = 1
    } = options;

    const codigo = await this.generateUniqueCode();

    return await Cupon.create({
      codigo,
      tipo_descuento: 'porcentaje',
      valor: porcentaje,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      max_uso: maxUso,
      usado: 0,
      activo: true,
      descripcion
    });
  }

  /**
   * Crea un cupón de descuento en soles
   * @param {number} soles - Cantidad en soles de descuento
   * @param {Object} options - Opciones adicionales
   */
  static async createSolesCupon(soles, options = {}) {
    const {
      fechaInicio = null,
      fechaFin = null,
      descripcion = `S/ ${soles} de descuento`,
      maxUso = 1
    } = options;

    const codigo = await this.generateUniqueCode();

    return await Cupon.create({
      codigo,
      tipo_descuento: 'soles',
      valor: soles,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      max_uso: maxUso,
      usado: 0,
      activo: true,
      descripcion
    });
  }

  /**
   * Crea un cupón personalizado
   * @param {Object} cuponData - Datos del cupón
   */
  static async createCustomCupon(cuponData) {
    const {
      tipo_descuento,
      valor,
      fechaInicio = null,
      fechaFin = null,
      maxUso = 1,
      descripcion = null
    } = cuponData;

    if (!['porcentaje', 'soles'].includes(tipo_descuento)) {
      throw new Error('Tipo de descuento debe ser "porcentaje" o "soles"');
    }

    const codigo = await this.generateUniqueCode();

    return await Cupon.create({
      codigo,
      tipo_descuento,
      valor,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      max_uso: maxUso,
      usado: 0,
      activo: true,
      descripcion: descripcion || `${tipo_descuento === 'porcentaje' ? valor + '%' : 'S/ ' + valor} de descuento`
    });
  }

  /**
   * Valida si un cupón es válido para usar
   * @param {string} codigo - Código del cupón
   * @returns {Promise<Object>} Resultado de validación
   */
  static async validateCupon(codigo) {
    const cupon = await Cupon.findOne({ where: { codigo } });

    if (!cupon) {
      return { valid: false, message: 'Cupón no encontrado' };
    }

    if (!cupon.activo) {
      return { valid: false, message: 'Cupón inactivo' };
    }

    if (cupon.usado >= cupon.max_uso) {
      return { valid: false, message: 'Cupón ya fue utilizado' };
    }

    const now = new Date();
    
    if (cupon.fecha_inicio && now < cupon.fecha_inicio) {
      return { valid: false, message: 'Cupón aún no está vigente' };
    }

    if (cupon.fecha_fin && now > cupon.fecha_fin) {
      return { valid: false, message: 'Cupón expirado' };
    }

    return { 
      valid: true, 
      cupon,
      message: 'Cupón válido'
    };
  }

  /**
   * Marca un cupón como usado
   * @param {string} codigo - Código del cupón
   */
  static async useCupon(codigo) {
    const cupon = await Cupon.findOne({ where: { codigo } });
    
    if (!cupon) {
      throw new Error('Cupón no encontrado');
    }

    await cupon.increment('usado');
    
    return cupon;
  }
}

module.exports = CuponGenerator;