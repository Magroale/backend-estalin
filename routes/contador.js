const express = require('express');
const router = express.Router();
const contadorController = require('../controllers/contador-controller');

router.post('/crearContador', contadorController.createContador);
router.put('/actualizarContador/:id', contadorController.updateContador);
router.delete('/eliminarContador/:id', contadorController.deleteContador);
router.get('/contador/:nombre', contadorController.getContador);



module.exports = router;