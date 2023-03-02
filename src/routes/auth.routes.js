const { Router } = require("express");
const { register, login, confirmation, passwordReset, passwordRecovery, recoveredPassword, registerDoctor, firstLoginReset } = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

//Ejemplos del contenido esperado en el body para cada endpoint (junto con los params que están en cada url).

router.post("/register", register);
// Depende del tipo de usuario, este es el modelo para el registro de un hospital
// { "identification": "BA123456781", "email": "bmib_wldzn13@pihey.com", "phone": "+5730147285961", "password": "root123", "name": "hospital", "address": "123 calle falsa", "role": "hospital", "specialties": [{ "specialty": "pediatria" }, { "specialty": "psicologia" }, { "specialty": "cardiologia" }] }

router.post("/registerDoctor", authMiddleware, registerDoctor);
//{ "identification": "DA34567825", "email": "oscarardila96@gmail.com", "phone": "+573014728591", "role": "doctor", "name": "Dr Jose Gregorio", "address": "012 calle falsa", "hospitalId": "HA123456782" }

router.post("/login", login);
// { "email": "bmib_wldzn13@pihey.com", "password": "root123" }

router.get("/confirmation/:id/:token", confirmation);

router.put("/password-reset", passwordReset);
// { "email": "hospital1@gmail.com", "newPassword": "hola123", "currentPassword": "root123" }

router.put("/password-recovery", passwordRecovery);
// { "email": "bmib_wldzn13@pihey.com" }

router.put("/recover-password/:id/:token", recoveredPassword);
// { "newPassword": "root123" }

router.put("/first-login-reset", firstLoginReset);
// { "email": "hospital1@gmail.com", "newPassword": "hola123", "currentPassword": "root123" }

module.exports = router;