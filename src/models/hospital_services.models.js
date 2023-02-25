const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const HospitalServices = db.define("hospital_services", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = HospitalServices;