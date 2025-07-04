const { Producto } = require('../models/index');

const productoSeederSimple = async () => {
  try {
    console.log('🌱 Iniciando seeder simple de productos...');
    
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
        unidadProductoId: 3,
        categoriaProductoId: 1,
        marcaProductoId: 1,
        usoProductoId: 1,
        motivoLiquidacionId: 3
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
        unidadProductoId: 1,
        categoriaProductoId: 6,
        marcaProductoId: 3,
        usoProductoId: 1,
        motivoLiquidacionId: 2
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
        unidadProductoId: 3,
        categoriaProductoId: 1,
        marcaProductoId: 2,
        usoProductoId: 2,
        motivoLiquidacionId: null
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
        unidadProductoId: 3,
        categoriaProductoId: 1,
        marcaProductoId: 1,
        usoProductoId: 3,
        motivoLiquidacionId: null
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
        unidadProductoId: 1,
        categoriaProductoId: 2,
        marcaProductoId: 1,
        usoProductoId: 1,
        motivoLiquidacionId: 1
      }
    ];

    // Crear productos usando bulkCreate para evitar bucles
    await Producto.bulkCreate(productosData, {
      updateOnDuplicate: ['nombre', 'precio', 'precioLiquidacion', 'stock', 'descripcion', 'puntos', 'espesor', 'dimensiones', 'peso', 'resistenciaFuego', 'unidadProductoId', 'categoriaProductoId', 'marcaProductoId', 'usoProductoId', 'motivoLiquidacionId']
    });

    console.log('✅ Productos creados exitosamente');
    return productosData;
  } catch (error) {
    console.error('❌ Error al crear productos:', error);
    throw error;
  }
};

module.exports = productoSeederSimple;