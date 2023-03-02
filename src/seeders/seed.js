const db = require("../utils/database");
const Users = require("../models/users.model");
// const Hospitals = require("../models/hospitals.models");
// const Doctors = require("../models/doctors.models");
// const Specialties = require("../models/specialties.models");
// const HospitalSpecialties = require("../models/hospital_specialties.models");
// const Patients = require("../models/patients.models");
// const HospitalDoctors = require("../models/hospital_doctors.models");
// const Observations = require("../models/observations.models");

//Se creo el seed para fines de desarrollo y pruebas de endpoints y funcionamiento correcto de la aplicación.

const users = [
  { identification: "PA12345678", email: "oardila001@gmail.com", phone: "+573014728596", password: "root123", role: "paciente", confirmed: true },
  { identification: "PA12345673", email: "uyscdlm12i@gvfum.com", phone: "+573014728592", password: "root123", role: "paciente" },
  { identification: "PA12345671", email: "qwehr54i@gufubm.com", phone: "+573014728595", password: "root123", role: "paciente" },
  { identification: "HA123456781", email: "bmib_wldzn13@pihey.com", phone: "+5730147285961", password: "root123", role: "hospital" },
  { identification: "HA123456782", email: "bascasdc@pihey.com", phone: "+5730147285962", password: "root123", role: "hospital" },
  { identification: "HA123456783", email: "43aASs1dc@pihey.com", phone: "+5730147285956", password: "root123", role: "hospital" },
  { identification: "DA34567827", email: "mkakames459@vootin.com", phone: "+573014728594", password: "root123", role: "doctor" },
  { identification: "DA34567821", email: "marert29@vootin.com", phone: "+573014728599", password: "root123", role: "doctor" },
  { identification: "DA34567822", email: "mkakaad1@vootin.com", phone: "+573014728591", password: "root123", role: "doctor", }
]

const doctors = [
  { user_id: 7, name: "Dr Pedro", address: "123 calle falsa", hospital_id: 1, },
  { user_id: 8, name: "Dra Andrea", address: "123 calle falsa", hospital_id: 2 },
  { user_id: 9, name: "Dra Juliana", address: "123 calle falsa", hospital_id: 3 }
];

const newdoc = { identification: "DA34567825", email: "ascdia@aol.com", phone: "+573014728591", password: "root123", role: "doctor", name: "Dr Jose Gregorio", address: "012 calle falsa", hospitalId: "HA123456782" }

const patients = [
  { name: "Andres", address: "123 calle falsa", date_of_birth: "1984-03-20", user_id: 1, },
  { name: "Sergio", address: "123 calle falsa", date_of_birth: "2000-02-11", user_id: 2, },
  { name: "Camila", address: "123 calle falsa", date_of_birth: "1996-08-26", user_id: 3, },
];

const hospitals = [
  { user_id: 4, name: "La Colina", address: "123 calle falsa", specialties: [{ specialty: "pediatria" }, { specialty: "psicologia" }, { specialty: "cardiologia" }] },
  { user_id: 5, name: "Country", address: "456 calle falsa", specialties: [{ specialty: "ginecologia" }, { specialty: "cirugia" }, { specialty: "otorrinolaringología" }] },
  { user_id: 6, name: "Shaio", address: "789 calle falsa", specialties: [{ specialty: "urologia" }, { specialty: "neurologia" }, { specialty: "oftalmologia" }] }
];

const specialties = [
  { specialty: "ginecologia" },
  { specialty: "psicologia" },
  { specialty: "pediatria" },
  { specialty: "cirugia" },
  { specialty: "cardiologia" },
  { specialty: "otorrinolaringología" },
  { specialty: "urologia" },
  { specialty: "neurologia" },
  { specialty: "oftalmologia" },
];

const hospitalSpecialties = [
  { specialty_id: 2, hospital_id: 1 },
  { specialty_id: 5, hospital_id: 1 },
  { specialty_id: 6, hospital_id: 1 },
  { specialty_id: 4, hospital_id: 2 },
  { specialty_id: 9, hospital_id: 2 },
  { specialty_id: 7, hospital_id: 2 },
  { specialty_id: 1, hospital_id: 3 },
  { specialty_id: 8, hospital_id: 3 },
  { specialty_id: 3, hospital_id: 3 },
];
const hospitalDoctors = [
  { doctor_id: 1, hospital_id: 1 },
  { doctor_id: 3, hospital_id: 1 },
  { doctor_id: 1, hospital_id: 2 },
  { doctor_id: 2, hospital_id: 2 },
  { doctor_id: 2, hospital_id: 3 },
  { doctor_id: 3, hospital_id: 3 }
]

const observations = [
  { doctor_id: 1, patient_id: 2, hospital_id: 2, specialty_id: 7, health_state: "Sano" },
  { doctor_id: 2, patient_id: 1, hospital_id: 3, specialty_id: 1, health_state: "Enfermo" },
  { doctor_id: 3, patient_id: 3, hospital_id: 2, specialty_id: 4, health_state: "Recuperacion" },
  { doctor_id: 1, patient_id: 2, hospital_id: 1, specialty_id: 5, health_state: "Sano" },
  { doctor_id: 3, patient_id: 1, hospital_id: 2, specialty_id: 9, health_state: "En tratamiento" },
];

db.sync({ force: true })
  .then(() => {
    users.forEach(user => Users.create(user));
    // setTimeout(() => {
    //   patients.forEach(patient => Patients.create(patient));
    // }, 100);
    // setTimeout(() => {
    //   hospitals.forEach(hospital => Hospitals.create(hospital));
    // }, 200);
    // setTimeout(() => {
    //   doctors.forEach(doctor => Doctors.create(doctor));
    // }, 300);
    // setTimeout(() => {
    //   specialties.forEach(specialty => Specialties.create(specialty));
    // }, 400);
    // setTimeout(() => {
    //   observations.forEach(observation => Observations.create(observation));
    // }, 500);
    // setTimeout(() => {
    //   hospitalSpecialties.forEach(hs => HospitalSpecialties.create(hs));
    // }, 600);
    // setTimeout(() => {
    //   hospitalDoctors.forEach(hd => HospitalDoctors.create(hd));
    // }, 600);
  })
  .catch(error => console.log(error))

  //513b8736-a257-4e2d-80c2-53c38277dcaf