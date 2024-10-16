const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller'); // Importa el controlador de usuarios

/**
 * @swagger
 * /allUsers:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Recupera una lista de todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error interno del servidor
 */
router.get('/allUsers', usuarioController.getAllUsuarios);

/**
 * @swagger
 * /rol/{rol}:
 *   get:
 *     summary: Obtiene usuarios por rol
 *     description: Recupera una lista de usuarios que tienen un rol específico.
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         description: Rol del usuario a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios con el rol especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron usuarios con el rol especificado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/rol/:rol', usuarioController.getUsuarioByRol);

/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario del sistema basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/deleteUser/:id', usuarioController.deleteUsuario);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión
 *     description: Autentica a un usuario y devuelve un token de acceso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acceso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', usuarioController.login);




module.exports = router;