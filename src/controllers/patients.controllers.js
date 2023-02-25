const PatientsServices = require("../services/patients.services");

const getPatientObservations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PatientsServices.getPatientObs(id);
    res.json(result);
  } catch (error) {
    next(error)
  }
};

module.exports = { getPatientObservations };