const path = require('path');
const fs = require('fs').promises;
// Intentar usar Sharp, si falla usar versión simple
let ImageProcessor;
try {
  ImageProcessor = require('../utils/imageProcessor');
  console.log('✅ Using Sharp for image processing');
} catch (error) {
  console.warn('⚠️ Sharp not available, using simple image processor');
  ImageProcessor = require('../utils/imageProcessorSimple');
}
const catchError = require('../utils/catchError');

/**
 * Sube una sola imagen
 */
const uploadSingle = catchError(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No se recibió ningún archivo'
    });
  }

  const { tipo = 'general' } = req.params;
  const file = req.file;
  
  try {
    // Validar que es una imagen
    const validation = await ImageProcessor.validateImage(file.path);
    if (!validation.valid) {
      await fs.unlink(file.path); // Eliminar archivo inválido
      return res.status(400).json({
        success: false,
        message: 'El archivo no es una imagen válida'
      });
    }

    // Procesar imagen y crear diferentes tamaños
    const baseName = path.parse(file.filename).name;
    const outputDir = path.dirname(file.path);
    
    const sizes = await ImageProcessor.createImageSizes(
      file.path,
      baseName,
      outputDir
    );

    // Optimizar imagen original
    const optimizedPath = path.join(outputDir, `${baseName}-original.webp`);
    await ImageProcessor.optimizeImage(file.path, optimizedPath);

    // Eliminar archivo original no optimizado
    await fs.unlink(file.path);

    // Generar URLs públicas
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = path.relative(path.join(__dirname, '../../uploads'), outputDir);
    
    const urls = {};
    if (sizes.thumbnail) {
      // Sharp disponible - múltiples tamaños
      urls.original = `${baseUrl}/uploads/${relativePath}/${baseName}-original.webp`.replace(/\\/g, '/');
      urls.thumbnail = `${baseUrl}/uploads/${relativePath}/${baseName}-thumbnail.webp`.replace(/\\/g, '/');
      urls.small = `${baseUrl}/uploads/${relativePath}/${baseName}-small.webp`.replace(/\\/g, '/');
      urls.medium = `${baseUrl}/uploads/${relativePath}/${baseName}-medium.webp`.replace(/\\/g, '/');
      urls.large = `${baseUrl}/uploads/${relativePath}/${baseName}-large.webp`.replace(/\\/g, '/');
    } else {
      // Versión simple - solo original
      const ext = path.extname(file.originalname);
      urls.original = `${baseUrl}/uploads/${relativePath}/${baseName}-original${ext}`.replace(/\\/g, '/');
      urls.thumbnail = urls.original; // Usar la misma para todos los tamaños
      urls.small = urls.original;
      urls.medium = urls.original;
      urls.large = urls.original;
    }

    res.json({
      success: true,
      data: {
        filename: `${baseName}-original.webp`,
        originalName: file.originalname,
        mimetype: 'image/webp',
        size: validation.size,
        urls,
        metadata: {
          width: validation.width,
          height: validation.height,
          format: validation.format
        }
      }
    });

  } catch (error) {
    // Limpiar archivo en caso de error
    try {
      await fs.unlink(file.path);
    } catch (unlinkError) {
      console.error('Error eliminando archivo:', unlinkError);
    }

    throw error;
  }
});

/**
 * Sube múltiples imágenes
 */
const uploadMultiple = catchError(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No se recibieron archivos'
    });
  }

  const { tipo = 'general' } = req.params;
  const files = req.files;
  const results = [];
  const errors = [];

  for (const file of files) {
    try {
      // Validar imagen
      const validation = await ImageProcessor.validateImage(file.path);
      if (!validation.valid) {
        await fs.unlink(file.path);
        errors.push({
          filename: file.originalname,
          error: 'Archivo no válido'
        });
        continue;
      }

      // Procesar imagen
      const baseName = path.parse(file.filename).name;
      const outputDir = path.dirname(file.path);
      
      const sizes = await ImageProcessor.createImageSizes(
        file.path,
        baseName,
        outputDir
      );

      // Optimizar original
      const optimizedPath = path.join(outputDir, `${baseName}-original.webp`);
      await ImageProcessor.optimizeImage(file.path, optimizedPath);
      await fs.unlink(file.path);

      // Generar URLs
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const relativePath = path.relative(path.join(__dirname, '../../uploads'), outputDir);
      
      const urls = {
        original: `${baseUrl}/uploads/${relativePath}/${baseName}-original.webp`.replace(/\\/g, '/'),
        thumbnail: `${baseUrl}/uploads/${relativePath}/${baseName}-thumbnail.webp`.replace(/\\/g, '/'),
        small: `${baseUrl}/uploads/${relativePath}/${baseName}-small.webp`.replace(/\\/g, '/'),
        medium: `${baseUrl}/uploads/${relativePath}/${baseName}-medium.webp`.replace(/\\/g, '/'),
        large: `${baseUrl}/uploads/${relativePath}/${baseName}-large.webp`.replace(/\\/g, '/')
      };

      results.push({
        filename: `${baseName}-original.webp`,
        originalName: file.originalname,
        urls,
        metadata: {
          width: validation.width,
          height: validation.height,
          format: validation.format
        }
      });

    } catch (error) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error('Error eliminando archivo:', unlinkError);
      }

      errors.push({
        filename: file.originalname,
        error: error.message
      });
    }
  }

  res.json({
    success: true,
    data: {
      uploaded: results,
      errors: errors,
      total: files.length,
      successful: results.length,
      failed: errors.length
    }
  });
});

/**
 * Elimina una imagen
 */
const deleteImage = catchError(async (req, res) => {
  const { tipo, filename } = req.params;
  
  if (!filename) {
    return res.status(400).json({
      success: false,
      message: 'Nombre de archivo requerido'
    });
  }

  const uploadDir = path.join(__dirname, '../../uploads', tipo);
  const baseName = path.parse(filename).name.replace(/-original$/, '');
  
  // Lista de archivos a eliminar (todos los tamaños)
  const filesToDelete = [
    `${baseName}-original.webp`,
    `${baseName}-thumbnail.webp`,
    `${baseName}-small.webp`,
    `${baseName}-medium.webp`,
    `${baseName}-large.webp`
  ];

  const deletedFiles = [];
  const errors = [];

  for (const file of filesToDelete) {
    const filePath = path.join(uploadDir, file);
    try {
      await fs.unlink(filePath);
      deletedFiles.push(file);
    } catch (error) {
      if (error.code !== 'ENOENT') { // Ignorar si el archivo no existe
        errors.push({ file, error: error.message });
      }
    }
  }

  res.json({
    success: true,
    data: {
      deleted: deletedFiles,
      errors: errors
    }
  });
});

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteImage
};