// Importar todos los modelos con sus asociaciones
const {
  Producto,
  EtiquetaProducto,
  VolumenDescuento,
  ImagenesProducto
} = require('../models/index');

const productoSeeder = async () => {
  try {
    const productosData = [
      {
        id: 1,
        nombre: 'Placa de Yeso Estándar 1/2"',
        precio: 45.90,
        precioLiquidacion: null,
        stock: 150,
        descripcion: 'Placa de yeso estándar de 1/2 pulgada, ideal para tabiques divisorios y cielos rasos en interiores secos.',
        puntos: 46,
        espesor: '12.7mm',
        dimensiones: '1.22x2.44m',
        peso: '9.5kg',
        resistenciaFuego: 'No aplica',
        fechaInicioLiquidacion: null,
        fechaFinLiquidacion: null,
        hastaAcabarStock: false,
        unidadProductoId: 3, // Plancha
        categoriaProductoId: 1, // Tableros
        marcaProductoId: 1, // GYPLAC
        usoProductoId: 1, // Estructura Vertical
        motivoLiquidacionId: 3,
        etiquetas: [4, 5], // Estructura, Muro
        descuentos: [1, 2], // 60min-6%, 80min-10%
        imagenes: [1, 2, 3] // Primeras 3 imágenes
      },
      {
        id: 2,
        nombre: 'Canaleta con adhesivo 20x12mm Schneider Electric',
        precio: 12.50,
        precioLiquidacion: 10.90,
        stock: 85,
        descripcion: 'Canaleta plástica con adhesivo para instalaciones eléctricas, fácil instalación y acabado profesional.',
        puntos: 13,
        espesor: null,
        dimensiones: '20x12mm',
        peso: '0.15kg/m',
        resistenciaFuego: 'No aplica',
        fechaInicioLiquidacion: new Date('2025-01-15'),
        fechaFinLiquidacion: new Date('2025-03-15'),
        hastaAcabarStock: false,
        unidadProductoId: 1, // Unidad
        categoriaProductoId: 6, // Accesorios
        marcaProductoId: 3, // SCAFISA
        usoProductoId: 1, // Estructura Vertical
        motivoLiquidacionId: 2, // SobreStock
        etiquetas: [2, 3], // Seguridad, Comercial
        descuentos: [3], // 40min-5%
        imagenes: [4, 5, 6] // Imágenes canaleta
      },
      {
        id: 3,
        nombre: 'Placa Yeso RF 5/8" 15.9mm 1.22x2.44m',
        precio: 68.90,
        precioLiquidacion: null,
        stock: 75,
        descripcion: 'Placa de yeso con resistencia al fuego de 5/8", certificada para áreas que requieren protección contra incendios.',
        puntos: 69,
        espesor: '15.9mm',
        dimensiones: '1.22x2.44m',
        peso: '13.2kg',
        resistenciaFuego: '60 minutos',
        fechaInicioLiquidacion: null,
        fechaFinLiquidacion: null,
        hastaAcabarStock: false,
        unidadProductoId: 3, // Plancha
        categoriaProductoId: 1, // Tableros
        marcaProductoId: 2, // USG Boral
        usoProductoId: 2, // Áreas con Requerimiento RF
        motivoLiquidacionId: null,
        etiquetas: [1, 2, 4], // Fuego, Seguridad, Estructura
        descuentos: [1, 4], // 60min-6%, 900min-12%
        imagenes: [7, 8, 9] // Imágenes placa RF
      },
      {
        id: 4,
        nombre: 'Placa Yeso RH 1/2" 12.7mm 1.22x2.44m Verde',
        precio: 52.90,
        precioLiquidacion: null,
        stock: 90,
        descripcion: 'Placa de yeso resistente a la humedad, color verde, ideal para baños y cocinas.',
        puntos: 53,
        espesor: '12.7mm',
        dimensiones: '1.22x2.44m',
        peso: '10.2kg',
        resistenciaFuego: 'No aplica',
        fechaInicioLiquidacion: null,
        fechaFinLiquidacion: null,
        hastaAcabarStock: false,
        unidadProductoId: 3, // Plancha
        categoriaProductoId: 1, // Tableros
        marcaProductoId: 1, // GYPLAC
        usoProductoId: 3, // Áreas Húmedas
        motivoLiquidacionId: null,
        etiquetas: [4, 5], // Estructura, Muro
        descuentos: [2, 3], // 80min-10%, 40min-5%
        imagenes: [10] // Imagen estufa
      },
      {
        id: 5,
        nombre: 'Perfil Omega 89mm x 0.45mm x 3m',
        precio: 24.90,
        precioLiquidacion: 18.90,
        stock: 120,
        descripcion: 'Perfil metálico Omega galvanizado para estructura de tabiques de drywall.',
        puntos: 25,
        espesor: '0.45mm',
        dimensiones: '89mm x 3m',
        peso: '1.8kg',
        resistenciaFuego: 'No aplica',
        fechaInicioLiquidacion: new Date('2025-02-01'),
        fechaFinLiquidacion: null,
        hastaAcabarStock: true,
        unidadProductoId: 1, // Unidad
        categoriaProductoId: 2, // Perfiles
        marcaProductoId: 1, // GYPLAC
        usoProductoId: 1, // Estructura Vertical
        motivoLiquidacionId: 1, // Vencimiento Próximo
        etiquetas: [4], // Estructura
        descuentos: [1, 2] // 60min-6%, 80min-10%
      }
    ];

    const productosCreados = [];

    for (const productoData of productosData) {
      const { etiquetas, descuentos, imagenes, ...productoSinRelaciones } = productoData;
      
      // Crear el producto sin relaciones (uso upsert para evitar duplicados)
      const [nuevoProducto, created] = await Producto.upsert(productoSinRelaciones);
      
      // Asociar etiquetas (N:M)
      if (etiquetas && etiquetas.length > 0) {
        await nuevoProducto.setEtiquetas(etiquetas);
        console.log(`🏷️ Etiquetas asociadas al producto ${productoData.id}: [${etiquetas.join(', ')}]`);
      }
      
      // Asociar descuentos (N:M)
      if (descuentos && descuentos.length > 0) {
        await nuevoProducto.setDescuentos(descuentos);
        console.log(`💰 Descuentos asociados al producto ${productoData.id}: [${descuentos.join(', ')}]`);
      }
      
      // Asociar imágenes (1:N) - actualizar las imágenes con el productoId
      if (imagenes && imagenes.length > 0) {
        await ImagenesProducto.update(
          { productoId: nuevoProducto.id },
          { where: { id: imagenes } }
        );
        console.log(`📸 Imágenes asociadas al producto ${productoData.id}: [${imagenes.join(', ')}]`);
      }
      
      if (created) {
        productosCreados.push(nuevoProducto);
        console.log(`✅ Producto creado: ${productoData.nombre} (ID: ${productoData.id})`);
      } else {
        console.log(`ℹ️ Producto actualizado: ${productoData.nombre} (ID: ${productoData.id})`);
      }
    }

    console.log('✅ Proceso de productos completado. Nuevos creados:', productosCreados.length);
    return productosCreados;
  } catch (error) {
    console.error('❌ Error al crear productos:', error);
    throw error;
  }
};

module.exports = productoSeeder;