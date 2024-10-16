// index.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;

const Usuario = require("./usuario");
const Gerente = require("./gerente");
const Coordinador = require("./coordinador");
const Contador = require("./contador");
const Compania = require("./compania");
const Proceso = require("./proceso");
const FechaEntrega = require("./fecha_entrega");
const Archivos = require("./archivo");

Usuario.associate = function (models) {
  Usuario.hasOne(Gerente, {
    foreignKey: "id_fk_usuario",
    sourceKey: "id_usuario",
  });

  Usuario.hasOne(Coordinador, {
    foreignKey: "id_fk_coordinador_usuario",
    sourceKey: "id_usuario",
  });

  Usuario.hasOne(Contador, {
    sourceKey: "id_usuario",
    foreignKey: "id_fk_usuario",
  });
};

Gerente.associate = function (models) {
  Gerente.belongsTo(Usuario, {
    foreignKey: "id_fk_usuario",
    targetKey: "id_usuario",
  });
};

Coordinador.associate = function (models) {
  Coordinador.belongsTo(Usuario, {
    targetKey: "id_usuario",
    foreignKey: "id_fk_coordinador_usuario",
  });

  Coordinador.hasMany(Contador, {
    foreignKey: "id_fk_coordinador",
  });
};

Compania.associate = function (models) {
  Compania.hasMany(Proceso, {
    foreignKey: "id_fk_compania",
  });

  Compania.hasOne(Contador, {
    foreignKey: "id_fk_compania",
  });
};

Contador.associate = function (models) {
  Contador.belongsTo(Coordinador, {
    foreignKey: "id_fk_coordinador",
  });
  Contador.belongsTo(Compania, {
    targetKey: "id_compania",
    foreignKey: "id_fk_compania",
  });
  Contador.belongsTo(Usuario, {
    targetKey: "id_usuario",
    foreignKey: "id_fk_usuario",
  });
};

Proceso.associate = function (models) {
  Proceso.belongsTo(Compania, {
    foreignKey: "id_fk_compania",
  });

  Proceso.hasMany(FechaEntrega, {
    foreignKey: "id_fk_proceso",
  });

  Proceso.hasMany(Archivos, {
    foreignKey: "id_fk_proceso",
  });
};

FechaEntrega.associate = function (models) {
  FechaEntrega.belongsTo(Proceso, {
    foreignKey: "id_fk_proceso",
    targetKey: "id_proceso",
  });
};

Archivos.associate = function (models) {
  Archivos.belongsTo(Proceso, {
    foreignKey: "id_fk_proceso",
    targetKey: "id_proceso",
  });
};

// Asociar modelos después de definirlos
const models = {
  Usuario,
  Gerente,
  Coordinador,
  Contador,
  Compania,
  Proceso,
  FechaEntrega,
  Archivos,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exportar sequelize y los modelos
module.exports = {
  models,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    await sequelize.sync({ alter: true, force: true}); // Usa { force: true } si deseas eliminar y volver a crear las tablas
    console.log("Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("Error al conectar o sincronizar la base de datos:", error);
  }
})();
// Exportar sequelize para que pueda ser usado en otros lugares
