const Patients = require("../models/patients.models");
const Hospitals = require("../models/hospitals.models");
const Doctors = require("../models/doctors.models");
const Services = require("../models/services.models");
const Observations = require("../models/observations.models");

class PatientsServices {
  static async getPatientObs(id) {
    try {
      const result = await Patients.findOne(
        {
          where: { id },
          attributes: ["name", "email", "id_number", "birthdate"],
          include: {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Hospitals,
                as: "hospital",
                attributes: ["name", "id_number", "address", "phone", "email"],
              }, {
                model: Doctors,
                as: "doctor",
                attributes: ["name", "id_number", "address", "phone", "email"]
              }, {
                model: Services,
                as: "service",
                attributes: ["id", "service"]
              }]
          }
        });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PatientsServices;