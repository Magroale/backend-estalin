require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,  // El nombre aquí debe coincidir con el uso en el código
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};