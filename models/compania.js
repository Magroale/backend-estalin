const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Compania = sequelize.define("Compania", {
  id_compania: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ultimo_digito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Compania;