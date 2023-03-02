const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const HospitalDoctors = db.define("hospital_doctors", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  hospital_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  doctor_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  }
});

module.exports = HospitalDoctors