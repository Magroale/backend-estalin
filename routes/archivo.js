const express = require('express');
const { verifySecretKey, upload } = require('../middleware/auth'); // Asegúrate de que la ruta sea correcta
const archivosController = require('../controllers/uploadfile-controller'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Endpoint para cargar archivos PDF
router.post('/upload', verifySecretKey, upload, archivosController.uploadFiles);

/**
 * @swagger
 * /archivos/{:id_proceso}:
 *   get:
 *     summary: Obtener archivos de un proceso
 *     description: Obtiene una lista de URLs de archivos asociados a un proceso.
 *     responses:
 *       '200':
 *         description: Lista de URLs de archivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       '404':
 *         description: Archivos no encontrados
 *     tags:
 *       - Archivos
 */
router.get('/archivos/:id_proceso', verifySecretKey, archivosController.obtenerArchivos);

/**
 * @swagger
 * /descargar/{id_archivo}:
 *   get:
 *     summary: Descargar archivo
 *     description: Descarga un archivo específico.
 *     responses:
 *       '200':
 *         description: Archivo descargado
 *       '404':
 *         description: Archivo no encontrado
 *     tags:
 *       - Archivos
 */
router.get('/descargar/:id_archivo', verifySecretKey, archivosController.descargarArchivo)

module.exports = router;