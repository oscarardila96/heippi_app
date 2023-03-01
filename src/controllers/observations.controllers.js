const PDFDocument = require("pdfkit");
const fs = require("fs");
const ObservationsServices = require("../services/observations.services");

const createObservation = async (req, res, next) => {
  try {
    const newObservation = req.body;
    const result = await ObservationsServices.createObservation(newObservation);
    if (result) {
      res.status(201).json({ message: "Observación creada satisfactoriamente" });
    } else {
      next({ message: "Solo es posible crear observaciones por médicos registrados" });
    }
  } catch (error) {
    next(error);
  }
};

const getDoctorsObs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ObservationsServices.getDoctorsObs(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getHospitalsObs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ObservationsServices.getHospitalsObs(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getPatientsObs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ObservationsServices.getPatientsObs(id);
    res.json(result);
  } catch (error) {
    next(error)
  }
};

const downloadPatientsObs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ObservationsServices.getPatientsObs(id);
    if (result) {
      const doc = new PDFDocument();
      doc.pipe(res)
      res.setHeader('Content-Type', 'application/pdf');
      doc.text(JSON.stringify(result, null, 2), 50, 50);
      doc.end();
    }
  } catch (error) {
    next(error)
  }
};


module.exports = { createObservation, getDoctorsObs, getHospitalsObs, getPatientsObs, downloadPatientsObs };



