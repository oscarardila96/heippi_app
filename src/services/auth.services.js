const Patients = require("../models/patients.models");
const Specialties = require("../models/specialties.models");
const Hospitals = require("../models/hospitals.models");
const HospitalSpecialties = require("../models/hospital_specialties.models");
const Doctors = require("../models/doctors.models");
const Users = require("../models/users.model");
const UsersServices = require("./users.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthServices {
  static async register(newUser) {
    try {
      const { identification, email, phone, password, role, name, address, date_of_birth, specialties, hospitalId } = newUser;

      if (role === "hospital") {
        const userHospital = { identification, email, phone, password, role };
        const hospital = { name, address }
        const token = await AuthServices.genToken(userHospital);
        userHospital.token = token;
        const newUser = await Users.create(userHospital);
        const { id } = newUser;
        hospital.user_id = id;
        const newHospital = await Hospitals.create(hospital);
        const newSpecialties = await Specialties.bulkCreate(specialties, { validate: true });
        const specialtiesArray = newSpecialties.map(specialty => (console.log(specialty), { specialty_id: specialty.id, hospital_id: newHospital.id }));
        await HospitalSpecialties.bulkCreate(specialtiesArray, { validate: true });
        return newUser;
      }

      if (role === "paciente") {
        const userPatient = { identification, email, phone, password, role };
        const patient = { name, address, date_of_birth };
        const token = await AuthServices.genToken(userPatient);
        userPatient.token = token;
        const newUser = await Users.create(userPatient);
        const { id } = newUser;
        patient.user_id = id;
        await Patients.create(patient);
        return newUser;
      }

      const hospital = await Users.findOne({ where: { identification: hospitalId } });
      if (role === "doctor" && hospital) {
        const { id } = hospital;
        const userDoctor = { identification, email, phone, password, role }
        const doctor = { name, address, hospital_id: id }
        const token = await AuthServices.genToken(userDoctor);
        userDoctor.token = token;
        const newUser = await Users.create(userDoctor);
        const { id: user_id } = newUser;
        doctor.user_id = user_id;
        await Doctors.create(doctor);
        return newUser;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async login({ email, password }) {
    try {
      const user = await Users.findOne({
        where: { email },
        attributes: ["id", "email", "password"]
      });
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        return isValid ? { isValid, user } : { isValid };
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }
  static async confirmation(id, token) {
    try {
      const result = await Users.findOne({ where: { id } });
      if (result) {
        const isValid = result.token === token;
        return isValid;
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }
  static async genToken(userData) {
    try {
      const token = jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { algorithm: "HS512" });
      return token;
    } catch (error) {
      throw error;
    }
  }
  static async resetPass(credentials) {
    try {
      const { currentPassword, newPassword, email } = credentials;
      const user = await Users.findOne(
        {
          where: { email },
          attributes: ["password"]
        });
      if (user) {
        const isValid = bcrypt.compareSync(currentPassword, user.password);
        if (isValid) {
          const hash = bcrypt.hashSync(newPassword, 10);
          const passChange = await UsersServices.updateByEmail(email, { password: hash });
          return passChange;
        }
        return isValid;
      } return user;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthServices;