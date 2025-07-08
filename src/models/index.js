// Importar todos los modelos
const User = require('./User');
const ConjuntoCarritoProducto = require('./ConjuntoCarritoProducto');
const CarritoProducto = require('./CarritoProducto');
const Producto = require('./Producto');
const UnidadProducto = require('./UnidadProducto');
const CategoriaProducto = require('./CategoriaProducto');
const MarcaProducto = require('./MarcaProducto');
const ImagenesProducto = require('./ImagenesProductos');
const MotivacionLiquidacion = require('./MotivoLiquidacion');
const VolumenDescuento = require('./VolumenDescuento');
const UsoProducto = require('./UsoProducto');
const EtiquetaProducto = require('./EtiquetaProducto');
const OfertaProducto = require('./OfertaProducto');
const ConfigPremiosRuleta = require('./Config_premios_ruleta');
const ConfigPuntos = require('./Config_puntos');
const ConfigRolRequisito = require('./ConfigRolRequisito');
const ConfigRolBeneficio = require('./ConfigRolBeneficio');
const ConfigRuleta = require('./Config_ruleta');
const ConfigSorteos = require('./Config_sorteos');
const CodigoReferido = require('./CodigoReferido');
const Cupon = require('./Cupon');
const UserCupon = require('./UserCupon');
const TipoEnvio = require('./TipoEnvio');
const MetodoPago = require('./MetodoPago');

// =====================================================
// DEFINIR TODAS LAS ASOCIACIONES
// =====================================================

// 1. Producto - UnidadProducto (1:N)
Producto.belongsTo(UnidadProducto, {
  foreignKey: 'unidadProductoId',
  as: 'unidad'
});

// 2. Producto - CategoriaProducto (1:N)
Producto.belongsTo(CategoriaProducto, {
  foreignKey: 'categoriaProductoId',
  as: 'categoria'
});

// 3. Producto - MarcaProducto (1:N)
Producto.belongsTo(MarcaProducto, {
  foreignKey: 'marcaProductoId',
  as: 'marca'
});

// 4. Producto - ImagenesProductos (N:M)
Producto.belongsToMany(ImagenesProducto, {
  through: 'ProductoImagen',
  foreignKey: 'productoId',
  otherKey: 'imagenProductoId',
  as: 'imagenes'
});
ImagenesProducto.belongsToMany(Producto, {
  through: 'ProductoImagen',
  foreignKey: 'imagenProductoId',
  otherKey: 'productoId',
  as: 'productos'
});

// 5. Producto - MotivoLiquidacion (1:N)
Producto.belongsTo(MotivacionLiquidacion, {
  foreignKey: 'motivoLiquidacionId',
  as: 'motivoLiquidacion'
});

// 6. Producto - VolumenDescuento (N:M)
Producto.belongsToMany(VolumenDescuento, {
  through: 'ProductoVolumenDescuento',
  foreignKey: 'productoId',
  otherKey: 'volumenDescuentoId',
  as: 'descuentos'
});

// 7. Producto - UsoProducto (1:N)
Producto.belongsTo(UsoProducto, {
  foreignKey: 'usoProductoId',
  as: 'uso'
});

// 8. Producto - EtiquetaProducto (N:M)
Producto.belongsToMany(EtiquetaProducto, {
  through: 'ProductoEtiqueta',
  foreignKey: 'productoId',
  otherKey: 'etiquetaProductoId',
  as: 'etiquetas'
});

// 12. Producto - OfertaProducto (N:M)
Producto.belongsToMany(OfertaProducto, {
  through: 'ProductoOferta',
  foreignKey: 'productoId',
  otherKey: 'ofertaProductoId',
  as: 'ofertas'
});
OfertaProducto.belongsToMany(Producto, {
  through: 'ProductoOferta',
  foreignKey: 'ofertaProductoId',
  otherKey: 'productoId',
  as: 'productos'
});

// =====================================================
// RELACIONES DE CARRITO
// =====================================================

// 9. User - ConjuntoCarritoProducto (1:N)
User.hasMany(ConjuntoCarritoProducto, {
  foreignKey: 'userId',
  as: 'conjuntosCarrito'
});
ConjuntoCarritoProducto.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// 10. ConjuntoCarritoProducto - CarritoProducto (1:N)
ConjuntoCarritoProducto.hasMany(CarritoProducto, {
  foreignKey: 'conjuntoCarritoProductoId',
  as: 'items'
});
CarritoProducto.belongsTo(ConjuntoCarritoProducto, {
  foreignKey: 'conjuntoCarritoProductoId',
  as: 'conjunto'
});

// 11. Producto - CarritoProducto (1:N)
Producto.hasMany(CarritoProducto, {
  foreignKey: 'productoId',
  as: 'enCarritos'
});
CarritoProducto.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
});

// =====================================================
// RELACIONES DE CONFIGURACIÓN
// =====================================================

// 13. ConfigRolRequisito - Producto (1:N)
ConfigRolRequisito.belongsTo(Producto, {
  foreignKey: 'producto_id',
  as: 'producto'
});
Producto.hasMany(ConfigRolRequisito, {
  foreignKey: 'producto_id',
  as: 'requisitosRol'
});

// 14. ConfigPremiosRuleta - Producto (1:N) - Solo para premios tipo 'producto'
ConfigPremiosRuleta.belongsTo(Producto, {
  foreignKey: 'producto_id',
  as: 'producto'
});
Producto.hasMany(ConfigPremiosRuleta, {
  foreignKey: 'producto_id',
  as: 'premiosRuleta'
});

// 15. CodigoReferido - User (1:N)
CodigoReferido.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});
User.hasMany(CodigoReferido, {
  foreignKey: 'usuario_id',
  as: 'codigosReferido'
});

// 16. ConjuntoCarritoProducto - TipoEnvio (N:1)
ConjuntoCarritoProducto.belongsTo(TipoEnvio, {
  foreignKey: 'tipoEnvioId',
  as: 'tipoEnvio'
});
TipoEnvio.hasMany(ConjuntoCarritoProducto, {
  foreignKey: 'tipoEnvioId',
  as: 'conjuntos'
});

// 17. ConjuntoCarritoProducto - MetodoPago (N:1)
ConjuntoCarritoProducto.belongsTo(MetodoPago, {
  foreignKey: 'metodoPagoId',
  as: 'metodoPago'
});
MetodoPago.hasMany(ConjuntoCarritoProducto, {
  foreignKey: 'metodoPagoId',
  as: 'conjuntos'
});

// 18. User - Cupon (N:M) a través de UserCupon
User.belongsToMany(Cupon, {
  through: UserCupon,
  foreignKey: 'userId',
  otherKey: 'cuponId',
  as: 'cupones'
});
Cupon.belongsToMany(User, {
  through: UserCupon,
  foreignKey: 'cuponId',
  otherKey: 'userId',
  as: 'usuarios'
});

// =====================================================
// EXPORTAR TODOS LOS MODELOS
// =====================================================

module.exports = {
  User,
  ConjuntoCarritoProducto,
  CarritoProducto,
  Producto,
  UnidadProducto,
  CategoriaProducto,
  MarcaProducto,
  ImagenesProducto,
  MotivacionLiquidacion,
  VolumenDescuento,
  UsoProducto,
  EtiquetaProducto,
  OfertaProducto,
  ConfigPremiosRuleta,
  ConfigPuntos,
  ConfigRolRequisito,
  ConfigRolBeneficio,
  ConfigRuleta,
  ConfigSorteos,
  CodigoReferido,
  Cupon,
  UserCupon,
  TipoEnvio,
  MetodoPago
};