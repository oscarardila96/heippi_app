const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Doctors = db.define("doctors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Doctors;