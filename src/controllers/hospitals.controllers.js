const HospitalsServices = require("../services/hospitals.services");

const getHospitalsObservations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HospitalsServices.getHospitalsObs(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getHospitalsObservations };