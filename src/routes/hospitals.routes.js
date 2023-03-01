const { Router } = require("express");
const { getHospitalsObservations } = require("../controllers/hospitals.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/:id/observations", authMiddleware, getHospitalsObservations);


module.exports = router;