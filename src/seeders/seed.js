const db = require("../utils/database");
const Hospitals = require("../models/hospitals.models");
const HospitalDoctors = require("../models/hospital_doctors.models");
const Doctors = require("../models/doctors.models");
const Services = require("../models/services.models");
const HospitalServices = require("../models/hospital_services.models");
const Patients = require("../models/patients.models");
const Observations = require("../models/observations.models");

const doctors = [
  { id_number: "12345678", email: "doctor@gmail.com", phone: "+573014728596", password: "root123", name: "doctor", address: "123 calle falsa" },
  { id_number: "123456781", email: "doctor1@gmail.com", phone: "+5730147285961", password: "root123", name: "doctor1", address: "123 calle falsa1" },
  { id_number: "123456782", email: "doctor2@gmail.com", phone: "+5730147285962", password: "root123", name: "doctor2", address: "123 calle falsa2" }
];

const patients = [
  { id_number: "A12345678", email: "patiente@gmail.com", phone: "+573014728596", password: "root123", name: "patiente", birthdate: "1996-07-14" },
  { id_number: "A123456781", email: "patiente1@gmail.com", phone: "+5730147285961", password: "root123", name: "patiente1", birthdate: "2000-02-20" },
  { id_number: "A123456782", email: "patiente2@gmail.com", phone: "+5730147285962", password: "root123", name: "patiente2", birthdate: "1960-10-02" }
];

const hospitals = [
  { id_number: "BA12345678", email: "hospital@gmail.com", phone: "+573014728596", password: "root123", name: "Hospital", address: "123 calle falsa" },
  { id_number: "BA123456781", email: "hospital1@gmail.com", phone: "+5730147285961", password: "root123", name: "Hospital1", address: "123 calle falsa1" },
  { id_number: "BA123456782", email: "hospital2@gmail.com", phone: "+5730147285962", password: "root123", name: "Hospital2", address: "123 calle falsa2" }
];

const services = [
  { service: "general" },
  { service: "psicologia" },
  { service: "pediatria" },
  { service: "ortopedia" },
  { service: "cardiologia" }
];

const hospitalDoctors = [
  { doctor_id: 1, hospital_id: 1 },
  { doctor_id: 1, hospital_id: 2 },
  { doctor_id: 2, hospital_id: 3 },
  { doctor_id: 3, hospital_id: 2 },
  { doctor_id: 3, hospital_id: 3 }
];

const hospitalServices = [
  { service_id: 4, hospital_id: 1 },
  { service_id: 1, hospital_id: 2 },
  { service_id: 2, hospital_id: 3 },
  { service_id: 3, hospital_id: 2 },
  { service_id: 5, hospital_id: 1 },
  { service_id: 4, hospital_id: 3 },
];

const observations = [
  { doctor_id: 1, patient_id: 2, hospital_id: 2, service_id: 3, health_state: "Sano" },
  { doctor_id: 2, patient_id: 1, hospital_id: 3, service_id: 2, health_state: "Enfermo" },
  { doctor_id: 3, patient_id: 3, hospital_id: 3, service_id: 4, health_state: "Recuperacion" },
  { doctor_id: 1, patient_id: 2, hospital_id: 1, service_id: 5, health_state: "Sano" },
  { doctor_id: 3, patient_id: 1, hospital_id: 2, service_id: 1, health_state: "En tratamiento" },
];

db.sync({ force: true })
  .then(() => {
    console.log("Iniciando seeding");
    doctors.forEach(doctor => Doctors.create(doctor));
    setTimeout(() => {
      patients.forEach(patient => Patients.create(patient));
    }, 100);
    setTimeout(() => {
      hospitals.forEach(hospital => Hospitals.create(hospital));
    }, 200);
    setTimeout(() => {
      services.forEach(service => Services.create(service));
    }, 300);
    setTimeout(() => {
      observations.forEach(observation => Observations.create(observation));
    }, 400);
    setTimeout(() => {
      hospitalDoctors.forEach(hospitalDoctor => HospitalDoctors.create(hospitalDoctor));
    }, 500);
    setTimeout(() => {
      hospitalServices.forEach(hospitalService => HospitalServices.create(hospitalService));
    }, 600);
  })
  .catch(error => console.log(error));