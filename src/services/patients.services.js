const Patients = require("../models/patients.models");
const Hospitals = require("../models/hospitals.models");
const Doctors = require("../models/doctors.models");
const Specialties = require("../models/specialties.models");
const Observations = require("../models/observations.models");

class PatientsServices {
  static async registerPatient(newPatient) {
    try {
      const patient = newPatient;
      const token = await AuthServices.genToken(newPatient);
      patient.token = token;
      const result = await Patients.create(patient);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getPatientObs(id) {
    try {
      const result = await Patients.findOne(
        {
          where: { id },
          attributes: ["name", "date_of_birth"],
          include: {
            model: Observations,
            as: "observation",
            attributes: ["id", "health_state", "createdAt"],
            include: [
              {
                model: Hospitals,
                as: "hospital",
                attributes: ["name", "address"],
              }, {
                model: Doctors,
                as: "doctor",
                attributes: ["name", "address"]
              }, {
                model: Specialties,
                as: "specialty",
                attributes: ["id", "specialty"]
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