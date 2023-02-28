const { Router } = require("express");
const { register, login, confirmation, passwordReset, passwordRecovery } = require("../controllers/auth.controllers");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/confirmation/:id/:token", confirmation);
router.put("/password-reset", passwordReset)
router.put("/password-recovery", passwordRecovery)

module.exports = router;