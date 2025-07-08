const CuponGenerator = require('../utils/cuponGenerator');
const { Cupon } = require('../models');
const catchError = require('../utils/catchError');

/**
 * Genera un cupón de descuento porcentual
 */
const generatePercentageCupon = catchError(async (req, res) => {
  const { porcentaje, fechaInicio, fechaFin, descripcion } = req.body;

  if (!porcentaje || porcentaje <= 0 || porcentaje > 100) {
    return res.status(400).json({
      success: false,
      message: 'Porcentaje debe ser entre 1 y 100'
    });
  }

  const cupon = await CuponGenerator.createPercentageCupon(porcentaje, {
    fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
    fechaFin: fechaFin ? new Date(fechaFin) : null,
    descripcion,
    maxUso: 1 // Siempre 1 uso
  });

  res.status(201).json({
    success: true,
    data: cupon
  });
});

/**
 * Genera un cupón de descuento en soles
 */
const generateSolesCupon = catchError(async (req, res) => {
  const { soles, fechaInicio, fechaFin, descripcion } = req.body;

  if (!soles || soles <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Monto en soles debe ser mayor a 0'
    });
  }

  const cupon = await CuponGenerator.createSolesCupon(soles, {
    fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
    fechaFin: fechaFin ? new Date(fechaFin) : null,
    descripcion,
    maxUso: 1 // Siempre 1 uso
  });

  res.status(201).json({
    success: true,
    data: cupon
  });
});

/**
 * Genera un cupón personalizado
 */
const generateCustomCupon = catchError(async (req, res) => {
  const { tipo_descuento, valor, fechaInicio, fechaFin, descripcion } = req.body;

  if (!tipo_descuento || !valor) {
    return res.status(400).json({
      success: false,
      message: 'Tipo de descuento y valor son requeridos'
    });
  }

  const cupon = await CuponGenerator.createCustomCupon({
    tipo_descuento,
    valor,
    fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
    fechaFin: fechaFin ? new Date(fechaFin) : null,
    descripcion,
    maxUso: 1 // Siempre 1 uso
  });

  res.status(201).json({
    success: true,
    data: cupon
  });
});

/**
 * Valida un cupón
 */
const validateCupon = catchError(async (req, res) => {
  const { codigo } = req.params;

  const validation = await CuponGenerator.validateCupon(codigo);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  res.json({
    success: true,
    data: {
      valid: true,
      cupon: validation.cupon,
      message: validation.message
    }
  });
});

/**
 * Aplica un cupón a un carrito/compra
 */
const applyCupon = catchError(async (req, res) => {
  const { codigo } = req.params;
  const { subtotal } = req.body;

  if (!subtotal || subtotal <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Subtotal es requerido y debe ser mayor a 0'
    });
  }

  // Validar cupón
  const validation = await CuponGenerator.validateCupon(codigo);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message
    });
  }

  const cupon = validation.cupon;
  let descuento = 0;
  let nuevoTotal = subtotal;

  // Calcular descuento
  if (cupon.tipo_descuento === 'porcentaje') {
    descuento = (subtotal * cupon.valor) / 100;
  } else if (cupon.tipo_descuento === 'soles') {
    descuento = Math.min(cupon.valor, subtotal); // No puede ser mayor al subtotal
  }

  nuevoTotal = subtotal - descuento;

  // Marcar cupón como usado
  await CuponGenerator.useCupon(codigo);

  res.json({
    success: true,
    data: {
      cupon: {
        codigo: cupon.codigo,
        tipo_descuento: cupon.tipo_descuento,
        valor: cupon.valor,
        descripcion: cupon.descripcion
      },
      subtotal: subtotal,
      descuento: descuento,
      total: nuevoTotal,
      aplicado: true
    }
  });
});

/**
 * Genera cupón automático para ruleta
 */
const generateRuletaCupon = catchError(async (req, res) => {
  const { tipo, valor } = req.body;

  if (!tipo || !valor) {
    return res.status(400).json({
      success: false,
      message: 'Tipo y valor son requeridos'
    });
  }

  // Cupón válido por 30 días
  const fechaFin = new Date();
  fechaFin.setDate(fechaFin.getDate() + 30);

  const cupon = await CuponGenerator.createCustomCupon({
    tipo_descuento: tipo,
    valor,
    fechaInicio: new Date(),
    fechaFin,
    descripcion: `Premio de ruleta: ${tipo === 'porcentaje' ? valor + '%' : 'S/ ' + valor} de descuento`,
    maxUso: 1
  });

  res.status(201).json({
    success: true,
    data: {
      ...cupon.toJSON(),
      premio: true,
      validoHasta: fechaFin
    }
  });
});

module.exports = {
  generatePercentageCupon,
  generateSolesCupon,
  generateCustomCupon,
  validateCupon,
  applyCupon,
  generateRuletaCupon
};