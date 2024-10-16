const sequelize = require('../models/index'); // Importa la instancia de Sequelize
const Usuario = require('../models/usuario');
const Gerente = require('../models/gerente');
const Coordinador = require('../models/coordinador');
const Contador = require('../models/contador');
const Compania = require('../models/compania');
const Proceso = require('../models/proceso');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincroniza sin forzar una recreación
    await sequelize.sync();
    console.log('Tablas sincronizadas correctamente.');

    // Inserta datos de prueba
    const usuario = await Usuario.create({
      nombre_usuario: 'usuario_prueba',
      nombre_completo: 'Usuario de Prueba',
      contrasena: '123',
      rol: 'Coordinador',
      email: 'usuario@correo.com',
    });

    const gerente = await Gerente.create({
      id_fk_usuario: usuario.id_usuario,
    });

    const coordinador = await Coordinador.create({
      id_fk_coordinador_usuario: usuario.id_usuario,
    });

    const compania = await Compania.create({
      nombre: 'Compania de Prueba',
    });

    const contador = await Contador.create({
      id_fk_coordinador: coordinador.id_coordinador,
      id_fk_compania: compania.id_compania,
      id_fk_usuario: usuario.id_usuario,
    });

    const proceso = await Proceso.create({
      id_fk_compania: compania.id_compania,
      fecha_carga: new Date(),
      fecha_entrega: new Date(),
      status: 'Activo',
    });

    console.log('Datos de prueba insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos de prueba:', error);
  } finally {
    await sequelize.close();
    console.log('Conexión cerrada.');
  }
})();