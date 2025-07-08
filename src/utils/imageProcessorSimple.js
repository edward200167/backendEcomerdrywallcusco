const fs = require('fs').promises;
const path = require('path');

/**
 * Procesador de imágenes simple (sin Sharp)
 * Para usar cuando Sharp tenga problemas de instalación
 */
class ImageProcessorSimple {
  
  /**
   * Copia la imagen sin procesar (fallback)
   */
  static async processImage(inputPath, outputPath) {
    try {
      await fs.copyFile(inputPath, outputPath);
      
      return {
        success: true,
        path: outputPath,
        format: path.extname(inputPath).slice(1),
        processed: false,
        note: 'Imagen copiada sin procesar (Sharp no disponible)'
      };
    } catch (error) {
      throw new Error(`Error copiando imagen: ${error.message}`);
    }
  }

  /**
   * Crea solo la imagen original (sin diferentes tamaños)
   */
  static async createImageSizes(inputPath, baseName, outputDir) {
    const ext = path.extname(inputPath);
    const outputPath = path.join(outputDir, `${baseName}-original${ext}`);
    
    try {
      await this.processImage(inputPath, outputPath);
      
      return {
        original: {
          path: outputPath,
          url: `/uploads/${path.relative(path.join(__dirname, '../../uploads'), outputPath).replace(/\\/g, '/')}`
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Optimiza imagen (solo copia en versión simple)
   */
  static async optimizeImage(inputPath, outputPath) {
    try {
      await fs.copyFile(inputPath, outputPath);

      const stats = await fs.stat(inputPath);
      
      return {
        success: true,
        originalFormat: path.extname(inputPath).slice(1),
        newFormat: path.extname(outputPath).slice(1),
        originalSize: stats.size,
        path: outputPath,
        processed: false
      };
    } catch (error) {
      throw new Error(`Error optimizando imagen: ${error.message}`);
    }
  }

  /**
   * Elimina archivo de imagen
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
   * Validación básica de imagen
   */
  static async validateImage(filePath) {
    try {
      const stats = await fs.stat(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      
      return {
        valid: allowedExtensions.includes(ext),
        format: ext.slice(1),
        size: stats.size,
        width: 'unknown',
        height: 'unknown'
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

module.exports = ImageProcessorSimple;