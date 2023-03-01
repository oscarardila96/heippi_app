const { Router } = require("express");
const { register, login, confirmation, passwordReset, passwordRecovery, recoveredPassword } = require("../controllers/auth.controllers");

const router = Router();

router.post("/register", register);
// Depende del tipo de usuario, este es el modelo para el registro de un hospital
// { "identification": "BA123456781", "email": "bmib_wldzn13@pihey.com", "phone": "+5730147285961", "password": "root123", "name": "hospital", "address": "123 calle falsa", "role": "hospital", "specialties": [{ "specialty": "pediatria" }, { "specialty": "psicologia" }, { "specialty": "cardiologia" }] }
router.post("/login", login);
// { "email": "bmib_wldzn13@pihey.com", "password": "root123" }
router.get("/confirmation/:id/:token", confirmation);
router.put("/password-reset", passwordReset);
// { "email": "hospital1@gmail.com", "newPassword": "hola123", "currentPassword": "root123" }
router.put("/password-recovery", passwordRecovery);
// { "email": "bmib_wldzn13@pihey.com" }
router.put("/recovered-password/:id/:token", recoveredPassword);

module.exports = router;