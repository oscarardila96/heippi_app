const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const HospitalSpecialties = db.define("hospital_specialties", {
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
  specialty_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = HospitalSpecialties;