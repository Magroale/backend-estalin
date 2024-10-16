const express = require('express');
const router = express.Router();
const companiaController = require('../controllers/compania-controller');

router.get('/allCompanias', companiaController.getAllCompanias);
router.post('/crearCompania', companiaController.createCompania);
router.put('/actualizarCompania/:id', companiaController.updateCompania);
router.delete('/eliminarCompania/:id', companiaController.deleteCompania);


module.exports = router;