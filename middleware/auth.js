const config = require('../config'); // Asegúrate de que este archivo exporte SECRET_KEY
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: fileFilter
}).array('files', 10);

function verifySecretKey(req, res, next) {
  const secretKey = req.headers['authorization']; // Asumes que la clave secreta viene en el header 'authorization'
  
  if (!secretKey) {
    return res.status(403).send({ auth: false, message: 'No secret key provided.' });
  }

  // Verifica si la clave secreta coincide
  if (secretKey !== config.SECRET_KEY) {
    console.error('secretKey ', secretKey);
    console.error('Jconfig.SECRET_KEY ', config.SECRET_KEY);
    return res.status(401).send({ auth: false, message: 'Invalid secret key.' });
  }

  // Si la clave secreta es válida, permite continuar
  next();
}

module.exports = {
  verifySecretKey, upload
};
