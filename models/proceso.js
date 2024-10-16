const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Proceso = sequelize.define("Proceso", {
  id_proceso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_fk_compania: {
    type: DataTypes.INTEGER,
  },
  nombre_proceso:{
    type: DataTypes.TEXT,
  },
  fecha_carga: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Revision', 'Finalizado'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  }
},{tableName: 'Proceso',});




module.exports = Proceso;