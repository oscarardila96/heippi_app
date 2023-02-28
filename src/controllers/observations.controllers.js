const ObservationsServices = require("../services/observations.services");

const createObservation = async (req, res, next) => {
  try {
    const newObservation = req.body;
    const result = await ObservationsServices.createObservation(newObservation);
    if (result) {
      res.status(201).json({ message: "Observación creada satisfactoriamente" });
    } else {
      next({ message: "Error al agregar observación" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createObservation };



