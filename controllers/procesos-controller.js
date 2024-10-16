const { models } = require("../models");
const Proceso = models.Proceso;
const FechaEntrega = models.FechaEntrega;
const Compania = models.Compania;
const Usuario = models.Usuario;
const Contador = models.Contador;

// Obtener todos los procesos
exports.getAllProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll();
    res.json(procesos);
  } catch (error) {
    console.error("Error al obtener procesos:", error); // Log para ver el error real
    res.status(500).json({ error: "Error al obtener procesos" });
  }
};

// Obtener todos los procesos de una compañía
exports.getProcesosDeCompania = async (req, res) => {
  const { id_compania } = req.params;
  try {
    const procesos = await Proceso.findAll({
      where: { id_fk_compania: id_compania },
    });
    res.json(procesos);
  } catch (error) {
    console.error("Error al obtener procesos:", error); // Log para ver el error real
    res.status(500).json({ error: "Error al obtener procesos" });
  }
};

// Crear un nuevo proceso
exports.createProceso = async (req, res) => {
  const { id_fk_compania, nombre_proceso, fecha_carga, fecha_entrega, status, descripcion } =
    req.body;
  try {
    const nuevoProceso = await Proceso.create({
      id_fk_compania,
      nombre_proceso,
      fecha_carga,
      status,
      descripcion,
    });
    const nuevaFechaEntrega = await FechaEntrega.create({
      id_fk_proceso: nuevoProceso.id_proceso,
      fecha_entrega,
    });
    res
      .status(201)
      .json({ proceso: nuevoProceso, fechaEntrega: nuevaFechaEntrega });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al crear proceso" });
  }
};

// Actualizar un proceso
exports.updateProceso = async (req, res) => {
  const { id } = req.params; // ID del proceso a actualizar
  const { id_fk_compania, fecha_carga, status } = req.body;

  try {
    // Buscar el proceso por el ID
    const proceso = await Proceso.findOne({
      where: { id_proceso: id },
    });

    if (!proceso) {
      return res.status(404).json({ error: "Proceso no encontrado" });
    }

    // Actualizar los datos del proceso
    await proceso.update({
      id_fk_compania: id_fk_compania || proceso.id_fk_compania,
      fecha_carga: fecha_carga || proceso.fecha_carga,
      status: status || proceso.status,
    });

    res.status(200).json({ mensaje: "Proceso actualizado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al actualizar proceso" });
  }
};

// Eliminar un proceso
exports.deleteProceso = async (req, res) => {
  const { id } = req.params; // ID del proceso a eliminar

  try {
    // Buscar el proceso por el ID
    const proceso = await Proceso.findOne({
      where: { id_proceso: id },
    });

    if (!proceso) {
      return res.status(404).json({ error: "Proceso no encontrado" });
    }

    // Eliminar el proceso
    await proceso.destroy();

    res.status(200).json({ mensaje: "Proceso eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al eliminar proceso" });
  }
};

// exports.obtenerProcesosFiltrados = async (req, res) => {
//   const { nombre, nombre_compania, status } = req.query; // Recibe los parámetros de filtro

//   try {
//     // Objeto para construir los filtros dinámicamente
//     const whereUsuario = {};
//     const whereCompania = {};
//     const whereProceso = {};

//     // Condicionales para agregar filtros dinámicamente
//     if (nombre) {
//       whereUsuario.nombre_completo = nombre;
//     }

//     if (nombre_compania) {
//       whereCompania.nombre = nombre_compania;
//     }

//     if (status) {
//       whereProceso.status = status;
//     }

//     // Búsqueda de los datos, construyendo condicionales dinámicos
//     console.log(whereUsuario)
//     const buscarContador = await Usuario.findOne({
//       where: whereUsuario, // Solo se aplica si hay un filtro por nombre
//     });

//     if (!buscarContador) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     const contador = await Contador.findOne({
//       where: { id_fk_usuario: buscarContador.id_usuario },
//     });

//     if (!contador) {
//       return res.status(404).json({ message: "Contador no encontrado" });
//     }

//     const contadorCompania = await Compania.findOne({
//       where: {
//         id_compania: contador.id_fk_compania,
//         ...whereCompania // Agrega filtro de nombre de la compañía si está presente
//       },
//     });

//     if (!contadorCompania) {
//       return res.status(404).json({ message: "Compañía no encontrada" });
//     }

//     const procesos = await Proceso.findAll({
//       where: {
//         id_fk_compania: contadorCompania.id_compania,
//         ...whereProceso, // Agrega filtro de status si está presente
//       },
//     });

//     res.json(procesos);
//   } catch (error) {
//     console.error("Error al obtener procesos filtrados:", error);
//     res.status(500).json({ error: "Error al obtener procesos filtrados" });
//   }
// };

exports.obtenerProcesosFiltrados = async (req, res) => {
  const { nombre, nombre_compania, status } = req.query; // Recibe los parámetros de filtro
  try {
    // Objeto para construir los filtros dinámicamente
    const whereUsuario = {};
    const whereCompania = {};
    const whereProceso = {};
    
    // Condicionales para agregar filtros dinámicamente
    if (nombre) {
      whereUsuario.nombre_completo = nombre;
    }
    if (nombre_compania) {
      whereCompania.nombre = nombre_compania;
    }
    if (status) {
      whereProceso.status = status;
    }

    // Búsqueda de los datos, construyendo condicionales dinámicos
    let buscarContador = null;
    if (nombre) {
      // Búsqueda del usuario (contador)
      buscarContador = await Usuario.findOne({
        where: whereUsuario, // Solo se aplica si hay un filtro por nombre
      });

      if (!buscarContador) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    }

    let contador = null;
    if (buscarContador) {
      contador = await Contador.findOne({
        where: { id_fk_usuario: buscarContador.id_usuario },
      });
    }

    let contadorCompania = null;
    if (contador) {
      contadorCompania = await Compania.findOne({
        where: {
          id_compania: contador.id_fk_compania,
          ...whereCompania // Agrega filtro de nombre de la compañía si está presente
        },
      });
    } else {
      contadorCompania = await Compania.findOne({
        where: {
          ...whereCompania // Agrega filtro de nombre de la compañía si está presente
        },
      });
    }

    if (!contadorCompania && (nombre || nombre_compania)) {
      return res.status(404).json({ message: "Compañía no encontrada" });
    }

    const whereProcesos = {};
    if (contadorCompania) {
      whereProcesos.id_fk_compania = contadorCompania.id_compania;
    }
    if (status) {
      whereProcesos.status = status;
    }

    const procesos = await Proceso.findAll({
      where: Object.keys(whereProcesos).length ? whereProcesos : {},
      include: [
        {
          model: Compania,
          attributes: ['nombre'],
          include: {
            model: Contador,
            attributes: ['id_fk_usuario'],
            include: {
              model: Usuario,
              attributes: ['nombre_completo']
            }
          }
        }
      ]
    });

    // Formatear la respuesta para incluir los nombres
    const respuesta = procesos.map(proceso => ({
      ...proceso.toJSON(),
      nombreCompania: proceso.Compania?.nombre,
      nombreUsuario: proceso.Compania?.Contador?.Usuario?.nombre_completo
    }));

    res.json(respuesta);
  } catch (error) {
    console.error("Error al obtener procesos filtrados:", error);
    res.status(500).json({ error: "Error al obtener procesos filtrados" });
  }
};


