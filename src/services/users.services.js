const Users = require("../models/users.model")

class UsersServices {
  static async getByEmail(email) {
    try {
      const result = await Users.findOne({ where: { email } });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateById(id, field) {
    try {
      const result = Users.update(field, { where: { id } });
      return result;
    } catch (error) {
      throw error
    }
  }
  static async updateByEmail(email, field) {
    try {
      const result = Users.update(field, { where: { email } });
      return result;
    } catch (error) {
      throw error
    }
  }
};

module.exports = UsersServices;