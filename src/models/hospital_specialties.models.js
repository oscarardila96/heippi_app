const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const HospitalSpecialties = db.define("hospital_specialties", {
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
  specialty_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  }
});

module.exports = HospitalSpecialties;