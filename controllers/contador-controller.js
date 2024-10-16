const { models } = require("../models");
const Contador = models.Contador;
const Usuario = models.Usuario;
const Compania = models.Compania;
const Coordinador = models.Coordinador;

// Crear un nuevo contador
exports.createContador = async (req, res) => {
  const { nombre_usuario, nombre_completo, contrasena, email, id_Coordinador, id_Compnia } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      nombre_completo,
      contrasena,
      rol: "Contador",
      email,
    });

    const buscarCoordinador = await Coordinador.findOne({
      where: { id_coordinador: id_Coordinador },
    });

    const buscarCompnia = await Compania.findOne({
      where: { id_compania: id_Compnia },
    });

    const nuevoContador = await Contador.create({
        id_fk_usuario  : nuevoUsuario.id_usuario,
        id_fk_coordinador : buscarCoordinador.id_coordinador,
        id_fk_compania: buscarCompnia.id_compania,
    });

    res
      .status(201)
      .json({ contador: nuevoContador, usuario: nuevoUsuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al crear contador" });
  }
};

exports.updateContador = async (req, res) => {
  const { id } = req.params; // ID del contador a actualizar
  const { nombre_usuario, nombre_completo, contrasena, email, id_fk_coordinador, id_fk_compania, id_Coordinador, id_Compnia } = req.body;

  try {
    // Buscar el usuario por el ID del contador
    const contador = await Contador.findOne({
      where: { id_contador: id },
    });

    if (!contador) {
      return res.status(404).json({ error: "Contador no encontrado" });
    }

    // Actualizar los datos del usuario asociado al contador
    const usuario = await Usuario.findOne({ where: { id_usuario: contador.id_fk_usuario } });
    if (usuario) {
      await usuario.update({
        nombre_usuario: nombre_usuario || usuario.nombre_usuario,
        nombre_completo: nombre_completo || usuario.nombre_completo,
        contrasena: contrasena || usuario.contrasena,
        email: email || usuario.email,

      });
    }

    if (contador) {
        await contador.update({
            id_fk_coordinador: id_fk_coordinador || contador.id_fk_coordinador,
            id_fk_compania: id_fk_compania || contador.id_fk_compania,
        });
    }

    res
      .status(200)
      .json({ mensaje: "Contador actualizado exitosamente", usuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al actualizar contador" });
  }
};

// Eliminar un contador
exports.deleteContador = async (req, res) => {
  const { id } = req.params; // ID del contador a eliminar

  try {
    // Buscar el contador por el ID del usuario asociado
    const contador = await Contador.findOne({
      where: { id_contador: id },
    });

    if (!contador) {
      return res.status(404).json({ error: "Contador no encontrado" });
    }

    // Eliminar el contador
    await contador.destroy();

    // Eliminar el usuario asociado al contador
    const usuario = await Usuario.findOne({ where: { id_usuario: contador.id_fk_usuario } });
    if (usuario) {
      await usuario.destroy();
    }

    res.status(200).json({ mensaje: "Contador eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al eliminar contador" });
  }
};
// Busca el contador por nombre
exports.getContador = async (req, res) => {
  const { nombre } = req.params; // nombre del contador

  try {
    // Buscar el contador por el nombre
    const buscarContador = await Usuario.findOne({
      where: { nombre_completo: nombre },
    });
    const contador = await Contador.findOne({
      where: { id_fk_usuario: buscarContador.id_usuario },
    });

    if (!contador) {
      return res.status(404).json({ error: "Contador no encontrado" });
    }

    res.status(200).json({ contador });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al obtener contador" });
  }
};