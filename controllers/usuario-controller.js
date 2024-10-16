const  {models}  = require("../models");
const Usuario = models.Usuario;
const crypto = require('crypto');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error); // Log para ver el error real
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por Rol
exports.getUsuarioByRol = async (req, res) => {
    const { rol } = req.params;
    
    try {
      // Guardamos el resultado de la búsqueda en 'usuarios'
      console.log(Usuario);
    //   const usuarios = await Usuario.findAll({ where: { rol: rol } });

      const usuarios = await Usuario.findAll({
        where: { rol: rol },
      });
      // Verificamos si se encontraron usuarios
      if (usuarios.length > 0) {
        res.json(usuarios);
      } else {
        res.status(404).json({ error: 'No se encontraron usuarios con el rol especificado' });
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error); // Log para ver el error real
      res.status(400).json({ error: 'Error al obtener usuarios por rol' });
    }
  };
  

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  const { nombre_usuario, nombre_completo, contrasena, rol, email } = req.body;
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.update({
        nombre_usuario,
        nombre_completo,
        contrasena,
        rol,
        email,
      });
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      await usuario.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar usuario" });
  }
};

// Controlador de inicio de sesión
exports.login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    // Busca al usuario por nombre de usuario y contraseña
    const usuario = await Usuario.findOne({ 
      where: { 
        nombre_usuario: nombre_usuario, 
        contrasena: contrasena 
      } 
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Genera una nueva API key
    const apiKey = crypto.randomBytes(30).toString('hex');

    // Actualiza el campo api_key_session del usuario con la nueva API key
    usuario.api_key_session = apiKey;
    rol = usuario.rol;
    await usuario.save();

    // Envía la API key como respuesta
    res.status(200).json({ message: 'Inicio de sesión exitoso', apiKey: apiKey, usuarioRol: rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
