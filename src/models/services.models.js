const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Services = db.define("services", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Services;