const express = require('express');
const Gerente = require('../models/gerente');
const router = express.Router();

const gerenteController = require('../controllers/gerente-controller');

router.post('/crearGerente', gerenteController.createGerente);
router.put('/actualizarGerente/:id', gerenteController.updateGerente);
router.delete('/eliminarGerente/:id', gerenteController.deleteGerente);

module.exports = router;