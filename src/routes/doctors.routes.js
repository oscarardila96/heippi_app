const { Router } = require("express");
const { getDoctorsObservations } = require("../controllers/doctors.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();


router.get("/:id/observations", authMiddleware, getDoctorsObservations);

module.exports = router;