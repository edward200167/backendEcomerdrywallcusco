const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { uploadSingle, uploadMultiple } = require('../middleware/uploadMiddleware');
const verifyJWT = require('../utils/verifyJWT');

// Rutas para upload de imágenes

// Subir una sola imagen
// POST /upload/single/productos (con archivo en campo 'imagen')
router.post('/single/:tipo', verifyJWT, uploadSingle('imagen'), uploadController.uploadSingle);

// Subir múltiples imágenes
// POST /upload/multiple/productos (con archivos en campo 'imagenes')
router.post('/multiple/:tipo', verifyJWT, uploadMultiple('imagenes', 10), uploadController.uploadMultiple);

// Eliminar imagen
// DELETE /upload/productos/imagen-123456-large.webp
router.delete('/:tipo/:filename', verifyJWT, uploadController.deleteImage);

module.exports = router;