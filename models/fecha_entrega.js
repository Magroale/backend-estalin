const {DataTypes} = require('sequelize');
const sequelize = require('./index');

const FechaEntrega = sequelize.define('FechaEntrega', {
  id_fecha_entrega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_fk_proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{tableName : 'Fecha_entrega',});

module.exports = FechaEntrega;