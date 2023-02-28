const AuthServices = require("../services/auth.services");
const UsersServices = require("../services/users.services");
const transporter = require("../utils/mailer");

const register = async (req, res, next) => {
  try {
    //Verificando que los datos mínimos estén completos en el body de la petición
    const { identification, email, phone, password, role, name, address } = req.body;
    if (identification && email && phone && password && role && name && address) {
      const newUser = req.body;
      const result = await AuthServices.register(newUser);
      if (result) {
        const { id, name, email, identification, role, createdAt, token } = result;
        const info = { id, name, email, identification, role, createdAt }
        res.status(201).json({ message: "Usuario creado exitosamente", info });
        // const url = `localhost:8000/api/v1/auth/confirmation/${id}/${token}`;
        // await transporter.sendMail({
        //   from: process.env.O_EMAIL,
        //   to: result.email,
        //   subject: "Confirmar Email || Heippi Api",
        //   html: `<h1>Confirma tu email</h1> <p></p><p>Solo haz click en el siguiente <a href=${url}>${url}</a>`
        // });
      } else {
        next({ message: "Error creando usuario" });
      }
    } else {
      next({ message: "Información faltante" });
    }
  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userConfirmed = await UsersServices.getByEmail(email);
    if (userConfirmed.confirmed) {
      const result = await AuthServices.login({ email, password });
      if (result.isValid) {
        const { id, email } = result.user;
        const userData = { id, email };
        const token = await AuthServices.genToken(userData);
        userData.token = token;
        res.json(userData);
      }
    } else {
      next({ message: "Credenciales erroneas" })
    }
  } catch (error) {
    next(error)
  }
};

const confirmation = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const result = await AuthServices.confirmation(id, token);
    console.log(result, id, token);
    if (result) {
      await UsersServices.update(id, { confirmed: true, token: null });
      res.json({ message: "Usuario confirmó su correo exitosamente" })
    } else {
      next({ message: "Error en la confirmación de correo" });
    }
  } catch (error) {
    next(error)
  }
};

const passwordReset = async (req, res, next) => {
  try {
    const credentials = req.body;
    const result = await AuthServices.resetPass(credentials);
    if (result) {
      res.json({ message: "Contraseña actualizada exitosamente" })
    } else {
      next({ message: "Error en la actualización de contraseña" });
    }
  } catch (error) {
    next(error)
  }
};

const passwordRecovery = async (req, res, next) => {
  try {
    // const credentials
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, confirmation, passwordReset, passwordRecovery };