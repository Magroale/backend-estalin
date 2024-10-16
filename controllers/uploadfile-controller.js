const bucket = require("../firebase");
const { models } = require("../models");
const Proceso = models.Proceso;
const FechaEntrega = models.FechaEntrega;
const Archivos = models.Archivos;

exports.uploadFiles = async (req, res) => {
  const {
    id_fk_compania,
    nombre_proceso,
    fecha_carga,
    fecha_entrega,
    status,
    descripcion,
  } = req.body;

  try {
    const archivos = req.files;
    const fileUrls = [];

    console.log("Archivos recibidos:", archivos);

    if (!archivos || archivos.length === 0) {
      throw new Error("No se han subido archivos.");
    }

    // Crear el nuevo proceso
    const nuevoProceso = await Proceso.create({
      id_fk_compania,
      nombre_proceso,
      fecha_carga,
      status,
      descripcion,
    });

    const uploadPromises = archivos.map((file) => {
      const normalizeFilename = (filename) => {
        return filename
          .normalize("NFD") // Normaliza para separar caracteres diacríticos
          .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres diacríticos
          .replace(/\s+/g, "_"); // Reemplaza espacios por guiones bajos
      };
      const uniqueName = `${Date.now()}-${normalizeFilename(file.originalname)}`;
      const blob = bucket.file(uniqueName);

      return new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on("error", (err) => reject(err));
        blobStream.on("finish", async () => {
          try {
            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            fileUrls.push(fileUrl);

            // Registrar el archivo en la base de datos
            await Archivos.create({
              id_fk_proceso: nuevoProceso.id_proceso,
              nombre: uniqueName,
            });

            resolve();
          } catch (dbError) {
            reject(dbError);
          }
        });

        blobStream.end(file.buffer);
      });
    });

    // Esperar a que todos los archivos se suban
    await Promise.all(uploadPromises);

    // Crear la nueva fecha de entrega
    const nuevaFechaEntrega = await FechaEntrega.create({
      id_fk_proceso: nuevoProceso.id_proceso,
      fecha_entrega,
    });

    res.status(200).json({
      message: "Proceso creado exitosamente",
      fileUrls,
      proceso: nuevoProceso,
      fechaEntrega: nuevaFechaEntrega,
    });
  } catch (error) {
    console.error("Error al cargar los archivos:", error);
    res.status(500).json({ error: "Error al crear el proceso" });
  }
};

// Obtener los archivos de un proceso
exports.obtenerArchivos = async (req, res) => {
  const { id_proceso } = req.params;

  try {
    const archivos = await Archivos.findAll({
      where: { id_fk_proceso: id_proceso },
    });

    if (archivos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron archivos para este proceso." });
    }

    const fileUrls = archivos.map((archivo) => {
      return `https://storage.googleapis.com/${bucket.name}/${archivo.nombre}`;
    });

    res.status(200).json({ fileUrls });
  } catch (error) {
    console.error("Error al obtener los archivos:", error);
    res.status(500).json({ error: "Error al obtener los archivos" });
  }
};

// Descargar un archivo específico
exports.descargarArchivo = async (req, res) => {
  const { id_archivo } = req.params;

  try {
    const archivo = await Archivos.findOne({
      where: { nombre: id_archivo },
    });

    if (!archivo) {
      return res.status(404).json({ message: "Archivo no encontrado." });
    }

    const file = bucket.file(archivo.nombre);
    const stream = file.createReadStream();

    stream.on("error", (err) => {
      console.error("Error al descargar el archivo:", err);
      res.status(500).json({ error: "Error al descargar el archivo" });
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${archivo.nombre}`
    );

    stream.pipe(res);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    res.status(500).json({ error: "Error al descargar el archivo" });
  }
};
