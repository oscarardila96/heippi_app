const Users = require("../models/users.model")

class UsersServices {
  static async update(id, field) {
    try {
      const result = Users.update(field, { where: { id } });
      return result;
    } catch (error) {
      throw error
    }
  }
};

module.exports = UsersServices;