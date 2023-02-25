const Doctors = require("../models/doctors.models");
const Hospitals = require("../models/hospitals.models");
const Observations = require("../models/observations.models");
const Patients = require("../models/patients.models");
const Services = require("../models/services.models");

class HospitalsServices {
  static async getHospitalsObs(id) {
    try {
      const result = await Hospitals.findOne(
        {
          where: { id },
          attributes: ["name", "id_number", "address", "phone", "email"],
          include: {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Doctors,
                as: "doctor",
                attributes: ["name", "id_number", "address", "phone", "email"]
              }, {
                model: Services,
                as: "service",
                attributes: ["id", "service"]
              }, {
                model: Patients,
                as: "patient",
                attributes: ["name", "email", "id_number", "birthdate"]
              }
            ]
          }
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = HospitalsServices;