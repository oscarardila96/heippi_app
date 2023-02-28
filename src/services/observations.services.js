const Observations = require("../models/observations.models");
const Users = require("../models/users.model");

class ObservationsServices {
  static async createObservation(newObservation) {
    try {
      const { doctor_id } = newObservation;
      const doctor = await Users.findOne({ where: { id: doctor_id } });
      if (doctor) {
        const result = await Observations.create(newObservation);
        return result;
      } else {
        next({ message: "Las observaciones solo pueden ser agregadas por médicos" });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ObservationsServices;