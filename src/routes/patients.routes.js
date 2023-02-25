const { Router } = require("express");
const { getPatientObservations } = require("../controllers/patients.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/:id/observations", getPatientObservations);

module.exports = router;