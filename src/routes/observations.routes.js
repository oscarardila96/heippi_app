const { Router } = require("express");
const { createObservation, getDoctorsObs, getHospitalsObs, getPatientsObs, downloadPatientsObs } = require("../controllers/observations.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", authMiddleware, createObservation);
// {"doctor_id": 1, "patient_id": 3, "hospital_id": 1, "specialty_id": 6, "health_state": "En cuidados intensivos" }

// Los endpoints responden con todas las observaciones dependiendo del usuario que las pida (doctores, hospitales y pacientes respectivamente)
router.get("/:id/getDoctorsObs", authMiddleware, getDoctorsObs);
router.get("/:id/getHospitalsObs", authMiddleware, getHospitalsObs);
router.get("/:id/getPatientsObs", authMiddleware, getPatientsObs);

//El endpoint devuelve un archivo PDF con las observaciones del paciente
router.get("/:id/downloadPatientsObs", authMiddleware, downloadPatientsObs);

module.exports = router;