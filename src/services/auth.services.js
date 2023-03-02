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

  //Dependiendo de si el usuario nuevo es un hospital o un paciente, el servicio de registro realiza tareas un poco diferentes pero las dos crean un usuario general donde se guarda su información de logeo y contacto y luego se crea otro usuario donde se maneja la información como el nombre, direccion y más datos misceláneos

  static async register(newUser) {
    const { identification, email, phone, password, role, name, address, date_of_birth, specialties } = newUser;
    try {
      if (role === "hospital") {
        const userHospital = { identification, email, phone, password, role };
        const hospital = { name, address }
        const token = await AuthServices.genToken(userHospital);
        userHospital.token = token;
        const newUser = await Users.create(userHospital);
        hospital.user_id = newUser.id;
        const newHospital = await Hospitals.create(hospital);
        const newSpecialties = await Specialties.bulkCreate(specialties, { validate: true });
        const specialtiesArray = newSpecialties.map(specialty => ({
          specialty_id: specialty.id,
          hospital_id: newHospital.id
        }));
        await HospitalSpecialties.bulkCreate(specialtiesArray, { validate: true });
        return newUser;
      }
      else if (role === "paciente") {
        const userPatient = { identification, email, phone, password, role };
        const patient = { name, address, date_of_birth };
        const token = await AuthServices.genToken(userPatient);
        userPatient.token = token;
        const newUser = await Users.create(userPatient);
        patient.user_id = newUser.id;
        await Patients.create(patient);
        return newUser;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // El registro de los doctores es bastante parecido a los otros pero, dado que tiene un endpoint diferente, preferí separarlo para mantener el código más organizado.

  static async registerDoctor(newDoctor) {
    const { identification, email, phone, password, role, name, address, hospitalId } = newDoctor;
    try {
      const hospital = await Users.findOne({ where: { identification: hospitalId } });
      if (role === "doctor") {
        const { id } = hospital;
        const userDoctor = { identification, email, phone, password, role };
        const doctor = { name, address, hospital_id: id };
        const newUser = await Users.create(userDoctor);
        doctor.user_id = newUser.id
        await Doctors.create(doctor);
        return newUser;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Servicio para cambiar la clave cuando se conoce la clave actual. Se valida y se encripta la nueva clave para guardarla en la base de datos.

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

  // Servicio para comparar la clave de loggeo y devolver el resultado de esta comparación.

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

  //El servicio valida que el token enviado en el correo sea el mismo que se creó antes de enviarlo para compararlo y poder confirmar el correo. 

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

  //Servicio para generar tokens únicamente.

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

  //Servicio para manejar el primer inicio de sesión, que funciona parecido al cambio de contraseña actual pero que este ademas confirma la cuenta ya que los usuarios tipo doctor no reciben token dentro del email de registro sino que reciben una clave aleatoria.

  static async firstLoginReset(credentials) {
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
          const passChange = await UsersServices.updateByEmail(email, { password: hash, confirmed: true });
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