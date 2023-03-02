const Hospitals = require("./hospitals.models");
const Doctors = require("./doctors.models");
const Specialties = require("./specialties.models");
const HospitalSpecialties = require("./hospital_specialties.models");
const Patients = require("./patients.models");
const Observations = require("./observations.models");
const HospitalDoctors = require("./hospital_doctors.models");
const Users = require("./users.model");

// Se crean las relaciones entre modelos de uno a muchos y de muchos a muchos utilizando tablas pivote y definiendo llaves foraneas

const initModels = () => {
  Patients.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Patients, { as: "patient", foreignKey: "user_id" });

  Hospitals.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Hospitals, { as: "hospital", foreignKey: "user_id" });

  Doctors.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Doctors, { as: "doctor", foreignKey: "user_id" });

  HospitalDoctors.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(HospitalDoctors, { as: "doctor", foreignKey: "hospital_id" });
  HospitalDoctors.belongsTo(Doctors, { as: "doctor", foreignKey: "doctor_id" });
  Doctors.hasMany(HospitalDoctors, { as: "hospital", foreignKey: "doctor_id" });

  HospitalSpecialties.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(HospitalSpecialties, { as: "specialty", foreignKey: "hospital_id" });
  HospitalSpecialties.belongsTo(Specialties, { as: "specialty", foreignKey: "specialty_id" });
  Specialties.hasMany(HospitalSpecialties, { as: "hospital", foreignKey: "specialty_id" });

  Observations.belongsTo(Patients, { as: "patient", foreignKey: "patient_id" });
  Patients.hasMany(Observations, { as: "observation", foreignKey: "patient_id" });

  Observations.belongsTo(Doctors, { as: "doctor", foreignKey: "doctor_id" });
  Doctors.hasMany(Observations, { as: "observation", foreignKey: "doctor_id" });

  Observations.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(Observations, { as: "observation", foreignKey: "hospital_id" });

  Observations.belongsTo(Specialties, { as: "specialty", foreignKey: "specialty_id" });
  Specialties.hasMany(Observations, { as: "<o></o>bservation", foreignKey: "specialty_id" });
};

module.exports = initModels;