const DoctorsServices = require("../services/doctors.services");


const getDoctorsObservations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await DoctorsServices.getDoctorsObs(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDoctorsObservations };