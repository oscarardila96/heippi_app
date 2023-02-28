const Doctors = require("../models/doctors.models");
const Hospitals = require("../models/hospitals.models");
const Observations = require("../models/observations.models");
const Patients = require("../models/patients.models");
const Specialties = require("../models/specialties.models");

class HospitalsServices {
  static async getHospitalsObs(id) {
    try {
      const result = await Hospitals.findOne(
        {
          where: { id },
          attributes: ["name", "address"],
          include: {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Doctors,
                as: "doctor",
                attributes: ["name", "address"]
              }, {
                model: Specialties,
                as: "specialty",
                attributes: ["id", "specialty"]
              }, {
                model: Patients,
                as: "patient",
                attributes: ["name", "date_of_birth"]
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