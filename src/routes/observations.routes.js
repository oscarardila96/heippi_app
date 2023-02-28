const { Router } = require("express");
const { createObservation } = require("../controllers/observations.controllers");

const router = Router();

router.post("/", createObservation);

module.exports = router;