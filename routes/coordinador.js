const express = require('express');
const router = express.Router();
const coordinadorController = require('../controllers/coordinador-controller');

router.post('/crearCoordinador', coordinadorController.createCoordinador);
router.put('/actualizarCoordinador/:id', coordinadorController.updateCoordinador);
router.delete('/eliminarCoordinador/:id', coordinadorController.deleteCoordinador);

module.exports = router;