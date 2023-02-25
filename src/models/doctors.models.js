const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const bcrypt = require("bcryptjs");

const Doctors = db.define("doctors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  id_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user, options) => {
      const { password } = user;
      const hash = bcrypt.hashSync(password, 10);
      user.password = hash
    }
  }
});

module.exports = Doctors;