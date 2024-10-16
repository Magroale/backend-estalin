const { models } = require("../models");
const Coordinador = models.Coordinador;
const Usuario = models.Usuario;

exports.createCoordinador = async (req, res) => {
  const { nombre_usuario, nombre_completo, contrasena, email } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      nombre_completo,
      contrasena,
      rol: "Coordinador",
      email,
    });
    const nuevoCoordinador = await Coordinador.create({
      id_fk_coordinador_usuario: nuevoUsuario.id_usuario,
    });
    res
      .status(201)
      .json({ coordinador: nuevoCoordinador, usuario: nuevoUsuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al crear coordinador" });
  }
};

exports.updateCoordinador = async (req, res) => {
  const { id } = req.params; // ID del Coordinador a actualizar
  const { nombre_usuario, nombre_completo, contrasena, email } = req.body;

  try {
    // Buscar el usuario por el ID del Coordinador
    const coordinador = await Coordinador.findOne({
      where: { id_fk_coordinador_usuario: id },
    });

    if (!Coordinador) {
      return res.status(404).json({ error: "Coorddinador no encontrado" });
    }

    // Actualizar los datos del usuario asociado al Coordinador
    const usuario = await Usuario.findOne({
      where: { id_usuario: coordinador.id_fk_coordinador_usuario },
    });
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
      .json({ mensaje: "Coordinador actualizado exitosamente", usuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al actualizar Coordinador" });
  }
};

exports.deleteCoordinador = async (req, res) => {
  const { id } = req.params; // ID del coordinador a eliminar

  try {
    // Buscar el coordinador por el ID del usuario asociado
    const coordinador = await Coordinador.findOne({
      where: { id_fk_coordinador_usuario: id },
    });

    if (!coordinador) {
      return res.status(404).json({ error: "Coordinador no encontrado" });
    }

    // Eliminar el coordinador
    await coordinador.destroy();

    // Eliminar el usuario asociado al coordinador
    const usuario = await Usuario.findOne({
      where: { id_usuario: coordinador.id_fk_coordinador_usuario },
    });
    if (usuario) {
      await usuario.destroy();
    }

    res.status(200).json({ mensaje: "Coordindor eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al eliminar coordindor" });
  }
};
// Busca el coordindor por nombre
exports.getCoordinador = async (req, res) => {
  const { nombre } = req.params; // nombre del coordindor

  try {
    // Buscar el contador por el nombre
    const buscarCoordinador = await Coordinador.findOne({
      where: { nombre_completo: nombre },
    });
    const contador = await Contador.findOne({
      where: { id_fk_coordinador_usuario: buscarCoordinador.id_usuario },
    });

    if (!contador) {
      return res.status(404).json({ error: "Coordinador no encontrado" });
    }

    res.status(200).json({ contador });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al obtener coordindor" });
  }
};
