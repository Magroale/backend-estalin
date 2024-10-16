const admin = require('firebase-admin');
const serviceAccount = require('./config/apiFireBase.json'); // Ruta a tu clave de servicio

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'archivos-mag.appspot.com' // Reemplaza con el nombre de tu bucket
});

const bucket = admin.storage().bucket();

module.exports =  bucket ;
