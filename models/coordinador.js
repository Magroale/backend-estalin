const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Coordinador = sequelize.define("Coordinador", {
  id_coordinador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_fk_coordinador_usuario: {
    type: DataTypes.INTEGER,
  },
  
},{tableName : 'Coordinador',});


module.exports = Coordinador;