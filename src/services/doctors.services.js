const Doctors = require("../models/doctors.models");
const Hospitals = require("../models/hospitals.models");
const Observations = require("../models/observations.models");
const Patients = require("../models/patients.models");
const Specialties = require("../models/specialties.models");

class DoctorsServices {
  static async getDoctorsObs(id) {
    try {
      const result = await Doctors.findOne(
        {
          where: { id },
          attributes: ["name", "address"],
          include:
          {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Patients,
                as: "patient",
                attributes: ["name", "date_of_birth"]
              }, {
                model: Specialties,
                as: "specialty",
                attributes: ["specialty"]
              }, {
                model: Hospitals,
                as: "hospital",
                attributes: ["name", "address"]
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