const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./routes/index');
const swaggerSetup = require('./swagger');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Middleware de autenticación
const { verifySecretKey } = require('./middleware/auth'); // Asegúrate de que el nombre es correcto

// Aplicar el middleware a las rutas que necesitan estar protegidas
app.use('/api', verifySecretKey);

swaggerSetup(app);

// Usa las rutas
app.use('/api', apiRouter);

module.exports = app;
