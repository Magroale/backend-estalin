const { models } = require("../models");
const Gerente = models.Gerente;
const Usuario = models.Usuario;

// Crear un nuevo gerente
exports.createGerente = async (req, res) => {
  const { nombre_usuario, nombre_completo, contrasena, email } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      nombre_completo,
      contrasena,
      rol: "Gerente",
      email,
    });
    const nuevoGerente = await Gerente.create({
      id_fk_usuario: nuevoUsuario.id_usuario,
    });
    res.status(201).json({ gerente: nuevoGerente, usuario: nuevoUsuario });
  } catch (error) {
    res.status(400).json({ error: "Error al crear gerente" });
  }
};

// Actualizar un Gerente
exports.updateGerente = async (req, res) => {
  const { id } = req.params; // ID del gerente a actualizar
  const { nombre_usuario, nombre_completo, contrasena, email } = req.body;

  try {
    // Buscar el usuario por el ID del gerente
    const gerente = await Gerente.findOne({
      where: { id_fk_usuario: id },
    });

    if (!gerente) {
      return res.status(404).json({ error: "Gerente no encontrado" });
    }

    // Actualizar los datos del usuario asociado al gerente
    const usuario = await Usuario.findOne({ where: { id_usuario: gerente.id_fk_usuario } });
    if (usuario) {
      await usuario.update({
        nombre_usuario: nombre_usuario || usuario.nombre_usuario,
        nombre_completo: nombre_completo || usuario.nombre_completo,
        contrasena: contrasena || usuario.contrasena,
        email: email || usuario.email,
      });
    }

    res
      .status(200)
      .json({ mensaje: "Gerente actualizado exitosamente", usuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al actualizar gerente" });
  }
};

// Eliminar un Gerente
exports.deleteGerente = async (req, res) => {
  const { id } = req.params; // ID del gerente a eliminar

  try {
    // Buscar el gerente por el ID del usuario asociado
    const gerente = await Gerente.findOne({
      where: { id_fk_usuario: id },
    });

    if (!gerente) {
      return res.status(404).json({ error: "Gerente no encontrado" });
    }

    // Eliminar el gerente
    await gerente.destroy();

    // Eliminar el usuario asociado al gerente
    const usuario = await Usuario.findOne({ where: { id_usuario: gerente.id_fk_usuario  } });
    if (usuario) {
      await usuario.destroy();
    }

    res.status(200).json({ mensaje: "Gerente eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al eliminar gerente" });
  }
};


exports.getGerente = async (req, res) => {
    const { nombre } = req.params; // nombre del gerente
  
    try {
      // Buscar el contador por el nombre
      const buscarGerente = await Usuario.findOne({
        where: { nombre_completo: nombre },
      });
      const gerente = await Contador.findOne({
        where: { id_fk_usuario: buscarGerente.id_usuario },
      });
  
      if (!gerente) {
        return res.status(404).json({ error: "Gerente no encontrado" });
      }
  
      res.status(200).json({ gerente });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Error al obtener gerente" });
    }
  };