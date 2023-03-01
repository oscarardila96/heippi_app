const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Specialties = db.define("specialties", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Specialties;