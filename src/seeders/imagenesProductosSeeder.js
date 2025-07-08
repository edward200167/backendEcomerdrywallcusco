const ImagenesProducto = require('../models/ImagenesProductos');

const imagenesProductosSeeder = async () => {
  try {
    const imagenesData = [
      {
        id: 1,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8550084-444-444/30102.jpg?v=638727513841270000',
        descripcion: 'Primera imagen de Placa de Yeso Estándar 1/2',
      },
      {
        id: 2,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8550085-1000-1000/30102_0.jpg?v=638727513846600000',
        descripcion: 'Segunda imagen de Placa de Yeso Estándar 1/2',
      },
      {
        id: 3,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8550086-1000-1000/30102_1.jpg?v=638727513848000000',
        descripcion: 'Tercera imagen de Placa de Yeso Estándar 1/2',
      },
      //Canaleta con adhesivo 20x12mm Schneider Electric
      {
        id: 4,
        url: 'https://promart.vteximg.com.br/arquivos/ids/7350697-1000-1000/49964.jpg?v=638255829782430000',
        descripcion: 'Primera imagen Canaleta con adhesivo 20x12mm Schneider Electrico',
      },
      {
        id: 5,
        url: 'https://promart.vteximg.com.br/arquivos/ids/7350698-1000-1000/49964_0.jpg?v=638255829786270000',
        descripcion: 'Segunda imagen Canaleta con adhesivo 20x12mm Schneider Electrico',
      },
      {
        id: 6,
        url: 'https://promart.vteximg.com.br/arquivos/ids/7350699-1000-1000/49964_4.jpg?v=638255829790800000',
        descripcion: 'Tercera imagen Canaleta con adhesivo 20x12mm Schneider Electrico',
      },
      //Placa Yeso St 1/2\" 12.7mm 1.22x2.44m Volcanita
      {
        id: 7,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8549593-1000-1000/14522.jpg?v=638727489696970000',
        descripcion: 'Primera imagen Placa Yeso St 1/2\" 12.7mm 1.22x2.44m Volcanita',
      },
      {
        id: 8,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8549594-1000-1000/14522_0.jpg?v=638727489701330000',
        descripcion: 'Segunda imagen Placa Yeso St 1/2\" 12.7mm 1.22x2.44m Volcanita',
      },
      {
        id: 9,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8549595-1000-1000/14522_1.jpg?v=638727489702770000',
        descripcion: 'Tercera imagen Placa Yeso St 1/2\" 12.7mm 1.22x2.44m Volcanita',
      },
      //Estufa Industrial 3000W Orange
      {
        id: 10,
        url: 'https://promart.vteximg.com.br/arquivos/ids/8721531-1000-1000/161511.jpg?v=638784537037330000',
        descripcion: 'Primera imagen Estufa Industrial 3000W Orange',
      },
    ];

    const imagenesCreadas = [];

    for (const imagenData of imagenesData) {
      const existeImagen = await ImagenesProducto.findByPk(imagenData.id);
      
      if (!existeImagen) {
        const nuevaImagen = await ImagenesProducto.create(imagenData);
        imagenesCreadas.push(nuevaImagen);
        console.log(`✅ Imagen creada: ${imagenData.descripcion} (ID: ${imagenData.id})`);
      } else {
        console.log(`ℹ️ Imagen ya existe: ${existeImagen.descripcion} (ID: ${existeImagen.id})`);
      }
    }

    console.log('✅ Proceso de imágenes completado. Nuevas creadas:', imagenesCreadas.length);
    return imagenesCreadas;
  } catch (error) {
    console.error('❌ Error al crear imágenes de productos:', error);
    throw error;
  }
};

module.exports = imagenesProductosSeeder;