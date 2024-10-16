// scripts/crearUsuario.js
const sequelize = require("../models/index"); // Asegúrate de que tu conexión a la base de datos esté establecida
const Usuario = require("../models/usuario"); // Importa el modelo Usuario
const Coordinador = require("../models/coordinador");
const Gerente = require("../models/gerente");
const Contador = require("../models/contador");
const Compania = require("../models/compania");
const Proceso = require("../models/proceso");

async function crearUsuarioGerente() {
  try {
    // Sincroniza la base de datos (opcional, si no has hecho cambios en los modelos)
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Crea un nuevo usuarioGerente
    const nuevoUsuario = await Usuario.create({
      nombre_usuario: "mario", // Nombre de usuario
      nombre_completo: "Mario Gaitan Romero", // Nombre completo
      contrasena: "1234", // Contraseña
      rol: "Gerente", // Rol del usuario
      email: "Mario@example.com", // Email
    });

    const nuevoGerente = await Gerente.create({
      id_fk_usuario: nuevoUsuario.id_usuario,
    });

    // crea un nuevo usuarioCoordinador
    const nuevoUsuarioCoordinador = await Usuario.create({
      nombre_usuario: "Alejandro", // Nombre de usuario
      nombre_completo: "Alejandro Gaitan Romero", // Nombre completo
      contrasena: "1234", // Contraseña
      rol: "Coordinador", // Rol del usuario
      email: "Alejandro@example.com", // Email
    });

    const nuevoCoordinador = await Coordinador.create({
      id_fk_coordinador_usuario: nuevoUsuarioCoordinador.id_usuario,
    });

    // Crea un nuevo Compania
    const nuevoCompania = await Compania.create({
      nombre: "Axe international SAS", // Nombre de usuario
      nit: "901251384-8",
      ultimo_digito: 4,
    });

    const proceso = await Proceso.create({
      id_fk_compania: nuevoCompania.id_compania,
      fecha_carga: new Date().toLocaleDateString(),
      fecha_entrega: new Date().toLocaleDateString(),
      status: "Activo",
    });

    // Crea un nuevo usuarioContdor
    const nuevoUsuarioContador = await Usuario.create({
      nombre_usuario: "Alan", // Nombre de usuario
      nombre_completo: "Alan Gaitan Romero", // Nombre completo
      contrasena: "1234", // Contraseña
      rol: "Contador", // Rol del usuario
      email: "Alan@example.com", // Email
    });

    const nuevoContador = await Contador.create({
      id_fk_usuario: nuevoUsuarioContador.id_usuario,
      id_fk_coordinador: nuevoCoordinador.id_coordinador,
      id_fk_compania: nuevoCompania.id_compania,
    });

    console.log("Usuario creado:", nuevoUsuario.toJSON());
    console.log("Usuario creado Contador:", nuevoCoordinador.toJSON());
    console.log("Usuario creado Contador Enlazado:", nuevoContador.toJSON());
} catch (error) {
    console.error("Error al crear el usuario:", error);
  }
}

// Llama a la función para crear el usuario
crearUsuarioGerente();
