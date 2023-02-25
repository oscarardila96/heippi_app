const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const HospitalDoctors = db.define("hospital_doctors", {
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
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = HospitalDoctors;