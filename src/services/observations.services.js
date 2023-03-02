const Doctors = require("../models/doctors.models");
const Hospitals = require("../models/hospitals.models");
const Observations = require("../models/observations.models");
const Patients = require("../models/patients.models");
const Specialties = require("../models/specialties.models");
const Users = require("../models/users.model");

// Los tres servicios realizan el mismo proceso desde diferente perspectiva. Cada uno empieza desde una tabla o usuario diferente y desde ahí se partepara buscar el resto de la información y devolverla al controlador.

class ObservationsServices {
  static async createObservation(newObservation) {
    try {
      const { doctor_id } = newObservation;
      const doctor = await Doctors.findOne({ where: { id: doctor_id } });
      if (doctor) {
        const result = await Observations.create(newObservation);
        return result;
      } else {
        return doctor;
      }
    } catch (error) {
      throw error;
    }
  }
  static async getDoctorsObs(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        attributes: ["identification", "email", "phone"],
        include: {
          model: Doctors,
          as: "doctor",
          attributes: ["name", "address"],
          include: {
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
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getHospitalsObs(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        attributes: ["identification", "email", "phone"],
        include: {
          model: Hospitals,
          as: "hospital",
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

      }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getPatientsObs(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        attributes: ["identification", "email", "phone"],
        include: {
          model: Patients,
          as: "patient",
          attributes: ["name", "date_of_birth"],
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
                model: Hospitals,
                as: "hospital",
                attributes: ["name", "address"]
              }
            ]
          }
        }

      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ObservationsServices;