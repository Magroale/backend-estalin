const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Gerente = sequelize.define(
  "Gerente",
  {
    id_gerente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_fk_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "Gerente" }
);

module.exports = Gerente;
