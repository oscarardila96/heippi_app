const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Specialties = db.define("specialties", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Specialties;