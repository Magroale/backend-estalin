const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Archivos = sequelize.define("Archivos", {
  id_archivo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_fk_proceso:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
  }
});


module.exports = Archivos;