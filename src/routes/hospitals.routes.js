const { Router } = require("express");
const { getHospitalsObservations } = require("../controllers/hospitals.controllers");

const router = Router();

router.get("/:id/observations", getHospitalsObservations);

module.exports = router;