const { models } = require("../models");
const Compania = models.Compania;

// Obtener todos las companias
exports.getAllCompanias = async (req, res) => {
  try {
    const companias = await Compania.findAll();
    res.json(companias);
  } catch (error) {
    console.error("Error al obtener companias:", error); // Log para ver el error real
    res.status(500).json({ error: "Error al obtener companias" });
  }
};

exports.createCompania = async (req, res) => {
  const { nombre, nit, ultimo_digito } = req.body;
  try {
    const nuevaCompania = await Compania.create({
      nombre,
      nit,
      ultimo_digito,
    });
    res.status(201).json({ compania: nuevaCompania });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al crear compania" });
  }
};

// Actualizar una compania
exports.updateCompania = async (req, res) => {
  const { id } = req.params; // ID de la compania a actualizar
  const { nombre, nit, ultimo_digito } = req.body;

  try {
    // Buscar la compania por el ID
    const compania = await Compania.findOne({
      where: { id_compania: id },
    });

    if (!compania) {
      return res.status(404).json({ error: "Compañia no encontrada" });
    }

    // Actualizar los datos de la compania
    await compania.update({
      nombre: nombre || compania.nombre,
      nit: nit || compania.nit,
      ultimo_digito: ultimo_digito || compania.ultimo_digito,
    });

    res.status(200).json({ mensaje: "Compañia actualizada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al actualizar compañia" });
  }
};

exports.deleteCompania = async (req, res) => {
  const { id } = req.params; // ID de la compañía a eliminar

  try {
    // Buscar la compañía por el ID
    const compania = await Compania.findOne({
      where: { id_compania: id },
    });

    if (!compania) {
      return res.status(404).json({ error: "Compañía no encontrada" });
    }

    // Eliminar la compañía
    await compania.destroy();

    res.status(200).json({ mensaje: "Compañía eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al eliminar compañía" });
  }
};