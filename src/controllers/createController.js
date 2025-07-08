const catchError = require('../utils/catchError');

const createController = (modelName, options = {}) => {
  try {
    const Model = require(`../models/${modelName}`);
  
  // Configuración de includes por modelo
  const includeConfigs = {
    Producto: [
      { association: 'unidad', attributes: ['id', 'nombre'] },
      { association: 'categoria', attributes: ['id', 'nombre'] },
      { association: 'marca', attributes: ['id', 'nombre'] },
      { association: 'motivoLiquidacion', attributes: ['id', 'nombre'] },
      { association: 'uso', attributes: ['id', 'nombre', 'descripcion'] },
      { association: 'imagenes', attributes: ['id', 'url', 'descripcion'], through: { attributes: [] } },
      { association: 'etiquetas', attributes: ['id', 'nombre'], through: { attributes: [] } },
      { association: 'descuentos', attributes: ['id', 'cantidadMin', 'porcentaje'], through: { attributes: [] } },
      { association: 'ofertas', attributes: ['id', 'nombre', 'tipoDescuento', 'valorDescuento', 'fechaInicio', 'fechaFin', 'estado'], through: { attributes: [] } }
    ],
    OfertaProducto: [
      { association: 'productos', attributes: ['id', 'nombre', 'precio', 'precioLiquidacion', 'stock'], through: { attributes: [] } }
    ],
    ConjuntoCarritoProducto: [
      { association: 'user', attributes: ['id', 'nombre', 'correoElectronico', 'telefono'] },
      { association: 'tipoEnvio', attributes: ['id', 'nombre', 'precio', 'descripcion'] },
      { association: 'metodoPago', attributes: ['id', 'nombre', 'descripcion', 'urlImagen', 'numeroReferencia'] },
      { 
        association: 'items', 
        attributes: ['id', 'cantidadProductosSoles', 'cantidadProductosPuntos', 'totalSoles', 'totalPuntos'],
        include: [
          { 
            association: 'producto', 
            attributes: ['id', 'nombre', 'precio', 'puntos'] 
          }
        ]
      }
    ],
    CarritoProducto: [
      { 
        association: 'conjunto', 
        attributes: ['id', 'estado'],
        include: [
          { association: 'user', attributes: ['id', 'nombre', 'correoElectronico', 'telefono'] }
        ]
      },
      { association: 'producto', attributes: ['id', 'nombre', 'precio', 'puntos'] }
    ],
    User: [
      { 
        association: 'conjuntosCarrito', 
        attributes: ['id', 'estado', 'createdAt', 'updatedAt'],
        include: [
          {
            association: 'items',
            attributes: ['id', 'cantidadProductosSoles', 'cantidadProductosPuntos', 'totalSoles', 'totalPuntos'],
            include: [
              {
                association: 'producto',
                attributes: ['id', 'nombre', 'precio', 'puntos']
              }
            ]
          }
        ]
      },
      { 
        association: 'cupones',
        attributes: ['id', 'codigo', 'tipo_descuento', 'valor', 'fecha_inicio', 'fecha_fin', 'max_uso', 'usado', 'activo'],
        through: { 
          attributes: ['fechaUso', 'montoDescuento'] 
        }
      }
    ],
    ConfigRolRequisito: [
      { association: 'producto', attributes: ['id', 'nombre', 'precio'] }
    ],
    Config_premios_ruleta: [
      { association: 'producto', attributes: ['id', 'nombre', 'precio'] }
    ],
    CodigoReferido: [
      { association: 'usuario', attributes: ['id', 'nombre', 'correoElectronico'] }
    ]
  };

  const includes = includeConfigs[modelName] || [];
  
  // Detectar relaciones automáticamente
  const getRelationAssociations = () => {
    const associations = Model.associations || {};
    const relations = {
      manyToMany: [],
      hasMany: []
    };
    
    Object.keys(associations).forEach(key => {
      const association = associations[key];
      if (association.associationType === 'BelongsToMany') {
        relations.manyToMany.push(key);
      } else if (association.associationType === 'HasMany') {
        relations.hasMany.push(key);
      }
    });
    
    return relations;
  };

  const getAll = catchError(async (req, res) => {
    const results = await Model.findAll({ include: includes });
    return res.json(results);
  });

  const create = catchError(async (req, res) => {
    const relations = getRelationAssociations();
    const allRelationFields = [...relations.manyToMany, ...relations.hasMany];
    const { ...basicData } = req.body;
    const relationData = {};
    
    // Separar campos de relaciones
    allRelationFields.forEach(field => {
      if (req.body[field]) {
        relationData[field] = req.body[field];
        delete basicData[field];
      }
    });

    const result = await Model.create(basicData);
    
    // Asociar relaciones automáticamente
    for (const [field, data] of Object.entries(relationData)) {
      if (data && data.length > 0) {
        const setterMethod = `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
        if (typeof result[setterMethod] === 'function') {
          await result[setterMethod](data);
        }
      }
    }
    
    const createdRecord = await Model.findByPk(result.id, { include: includes });
    return res.status(201).json(createdRecord);
  });

  const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Model.findByPk(id, { include: includes });
    if (!result) return res.sendStatus(404);
    return res.json(result);
  });

  const update = catchError(async (req, res) => {
    const { id } = req.params;
    const relations = getRelationAssociations();
    const allRelationFields = [...relations.manyToMany, ...relations.hasMany];
    const { ...basicData } = req.body;
    const relationData = {};
    
    // Separar campos de relaciones
    allRelationFields.forEach(field => {
      if (req.body[field] !== undefined) {
        relationData[field] = req.body[field];
        delete basicData[field];
      }
    });

    const instance = await Model.findByPk(id);
    if (!instance) return res.sendStatus(404);
    
    // Actualizar campos básicos
    if (Object.keys(basicData).length > 0) {
      await instance.update(basicData);
    }
    
    // Actualizar relaciones automáticamente
    for (const [field, data] of Object.entries(relationData)) {
      const setterMethod = `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
      if (typeof instance[setterMethod] === 'function') {
        await instance[setterMethod](data);
      }
    }
    
    const updatedRecord = await Model.findByPk(id, { include: includes });
    return res.json(updatedRecord);
  });

  const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Model.destroy({ where: { id } });
    return res.sendStatus(204);
  });

  return { getAll, create, getOne, update, remove };
  } catch (error) {
    console.error(`Error loading model ${modelName}:`, error.message);
    return null;
  }
};

module.exports = createController;