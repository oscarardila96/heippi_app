const Doctors = require("../models/doctors.models");
const Hospitals = require("../models/hospitals.models");
const Observations = require("../models/observations.models");
const Patients = require("../models/patients.models");
const Services = require("../models/services.models");

class DoctorsServices {
  static async getDoctorsObs(id) {
    try {
      const result = await Doctors.findOne(
        {
          where: { id },
          attributes: ["name", "id_number", "address", "phone", "email"],
          include:
          {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Patients,
                as: "patient",
                attributes: ["name", "email", "id_number", "birthdate"]
              }, {
                model: Services,
                as: "service",
                attributes: ["id", "service"]
              }, {
                model: Hospitals,
                as: "hospital",
                attributes: ["name", "id_number", "address", "phone", "email"]
              }]
          }
        });
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = DoctorsServices;