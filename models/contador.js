const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Contador = sequelize.define("Contador", {
  id_contador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_fk_coordinador: {
    type: DataTypes.INTEGER,
  },
  id_fk_compania: {
    type: DataTypes.INTEGER,
  },
  id_fk_usuario: {
    type: DataTypes.INTEGER,
  },
},{tableName : 'Contador',});



module.exports = Contador;