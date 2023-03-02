const jwt = require("jsonwebtoken");
require("dotenv").config();

// Se protegen las rutas con el middleware de autenticación que se encarga de validar si el token que provee el usuario en los headers es válido. 

const authMiddleware = (req, res, next) => {
  let { authorization: token } = req.headers;
  token = token.replace("Bearer ", "");
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: "HS512" },
      (err, decoded) => {
        if (err) {
          res.status(498).json({ error: "Invalid token", message: "Token inválido, por favor enviar un token válido" });
        } else {
          console.log(decoded);
          next();
        }
      })
  } else {
    res.status(400).json({ error: "No token provided", message: "No se proporcionó token de autenticación" });
  }
};

module.exports = authMiddleware;