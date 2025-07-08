const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * Procesa y optimiza imágenes usando Sharp
 */
class ImageProcessor {
  
  /**
   * Redimensiona y optimiza una imagen
   * @param {string} inputPath - Ruta de la imagen original
   * @param {string} outputPath - Ruta donde guardar la imagen procesada
   * @param {Object} options - Opciones de procesamiento
   */
  static async processImage(inputPath, outputPath, options = {}) {
    const {
      width = 800,
      height = 600,
      quality = 80,
      format = 'webp',
      fit = 'cover'
    } = options;

    try {
      const processedImage = sharp(inputPath)
        .resize(width, height, { fit })
        .toFormat(format, { quality });

      await processedImage.toFile(outputPath);
      
      return {
        success: true,
        path: outputPath,
        format,
        width,
        height
      };
    } catch (error) {
      throw new Error(`Error procesando imagen: ${error.message}`);
    }
  }

  /**
   * Crea múltiples tamaños de una imagen
   * @param {string} inputPath - Ruta de la imagen original
   * @param {string} baseName - Nombre base sin extensión
   * @param {string} outputDir - Directorio de salida
   */
  static async createImageSizes(inputPath, baseName, outputDir) {
    const sizes = {
      thumbnail: { width: 150, height: 150, quality: 70 },
      small: { width: 300, height: 300, quality: 80 },
      medium: { width: 600, height: 600, quality: 85 },
      large: { width: 1200, height: 1200, quality: 90 }
    };

    const results = {};

    for (const [sizeName, options] of Object.entries(sizes)) {
      const outputPath = path.join(outputDir, `${baseName}-${sizeName}.webp`);
      
      try {
        const result = await this.processImage(inputPath, outputPath, {
          ...options,
          format: 'webp'
        });
        
        results[sizeName] = {
          path: outputPath,
          url: `/uploads/${path.relative(path.join(__dirname, '../../uploads'), outputPath).replace(/\\/g, '/')}`
        };
      } catch (error) {
        console.error(`Error creando tamaño ${sizeName}:`, error);
      }
    }

    return results;
  }

  /**
   * Optimiza imagen sin cambiar dimensiones
   * @param {string} inputPath - Ruta de la imagen original
   * @param {string} outputPath - Ruta de salida
   */
  static async optimizeImage(inputPath, outputPath) {
    try {
      const metadata = await sharp(inputPath).metadata();
      
      await sharp(inputPath)
        .toFormat('webp', { quality: 85 })
        .toFile(outputPath);

      return {
        success: true,
        originalFormat: metadata.format,
        newFormat: 'webp',
        originalSize: metadata.size,
        path: outputPath
      };
    } catch (error) {
      throw new Error(`Error optimizando imagen: ${error.message}`);
    }
  }

  /**
   * Elimina archivo de imagen
   * @param {string} filePath - Ruta del archivo a eliminar
   */
  static async deleteImage(filePath) {
    try {
      await fs.unlink(filePath);
      return { success: true };
    } catch (error) {
      console.error(`Error eliminando imagen ${filePath}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Valida si el archivo es una imagen válida
   * @param {string} filePath - Ruta del archivo
   */
  static async validateImage(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        valid: true,
        format: metadata.format,
        width: metadata.width,
        height: metadata.height,
        size: metadata.size
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

module.exports = ImageProcessor;