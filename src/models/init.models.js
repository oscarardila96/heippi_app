const Hospitals = require("./hospitals.models");
const HospitalDoctors = require("./hospital_doctors.models");
const Doctors = require("./doctors.models");
const Services = require("./services.models");
const HospitalServices = require("./hospital_services.models");
const Patients = require("./patients.models");
const Observations = require("./observations.models");

const initModels = () => {
  HospitalDoctors.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(HospitalDoctors, { as: "doctor", foreignKey: "hospital_id" });
  HospitalDoctors.belongsTo(Doctors, { as: "doctor", foreignKey: "doctor_id" });
  Doctors.hasMany(HospitalDoctors, { as: "hospital", foreignKey: "doctor_id" });

  HospitalServices.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(HospitalServices, { as: "service", foreignKey: "hospital_id" });
  HospitalServices.belongsTo(Services, { as: "service", foreignKey: "service_id" });
  Services.hasMany(HospitalServices, { as: "hospital", foreignKey: "service_id" });

  Observations.belongsTo(Patients, { as: "patient", foreignKey: "patient_id" });
  Patients.hasMany(Observations, { as: "observation", foreignKey: "patient_id" });

  Observations.belongsTo(Services, { as: "service", foreignKey: "service_id" });
  Services.hasMany(Observations, { as: "observation", foreignKey: "service_id" });

  Observations.belongsTo(Hospitals, { as: "hospital", foreignKey: "hospital_id" });
  Hospitals.hasMany(Observations, { as: "observation", foreignKey: "hospital_id" });

  Observations.belongsTo(Doctors, { as: "doctor", foreignKey: "doctor_id" });
  Doctors.hasMany(Observations, { as: "observation", foreignKey: "doctor_id" });
};

module.exports = initModels;