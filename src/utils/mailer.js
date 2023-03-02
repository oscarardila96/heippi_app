const nodemailer = require("nodemailer");
require("dotenv").config();

//Configuración de NodeMailer para el envio de correos.

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.O_EMAIL,
    pass: process.env.O_PASS
  }
});

module.exports = transporter;