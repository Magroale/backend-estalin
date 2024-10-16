const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesos-controller');

router.get('/allProcesos', procesoController.getAllProcesos);
router.get('/procesosDeCompania/:id_compania', procesoController.getProcesosDeCompania);
router.post('/crearProceso', procesoController.createProceso);
router.put('/actualizarProceso/:id', procesoController.updateProceso);
router.delete('/eliminarProceso/:id', procesoController.deleteProceso);
router.get('/procesosFiltrados', procesoController.obtenerProcesosFiltrados); 



module.exports = router;