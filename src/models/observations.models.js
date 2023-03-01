const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Observations = db.define("observations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  specialty_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  health_state: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Observations;