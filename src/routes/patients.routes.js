const { Router } = require("express");
const { getPatientObservations } = require("../controllers/patients.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
// const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();


router.get("/:id/observations", authMiddleware, getPatientObservations);

module.exports = router;