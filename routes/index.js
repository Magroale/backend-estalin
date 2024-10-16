const express = require('express');
const usuarioRouter = require('./usuario');
const gerenteRouter = require('./gerente');
const coordinadorRouter = require('./coordinador');
const contadorRouter = require('./contador');
const companiaRouter = require('./compania');
const procesoRouter = require('./proceso');
const archivoRouter = require('./archivo');

const router = express.Router();

router.use('/usuario', usuarioRouter);
router.use('/gerente', gerenteRouter);
router.use('/coordinador', coordinadorRouter);
router.use('/contador', contadorRouter);
router.use('/compania', companiaRouter);
router.use('/proceso', procesoRouter);
router.use('/archivo', archivoRouter);

module.exports = router;