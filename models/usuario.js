const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_usuario: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  nombre_completo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('Gerente', 'Coordinador', 'Contador'),
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  api_key_session:{
    type: DataTypes.TEXT,
  }
});



module.exports = Usuario;