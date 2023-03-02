const AuthServices = require("../services/auth.services");
const UsersServices = require("../services/users.services");
const transporter = require("../utils/mailer");
const generator = require("generate-password");


// El controlador recibe la información y la envía al servicios mientras espera la respuesta para enviar un correo electrónico de confirmación de la cuenta

const register = async (req, res, next) => {
  try {
    const newUser = req.body;
    const result = await AuthServices.register(newUser);
    if (result) {
      const { id, name, token, email } = result;
      const url = `${process.env.PUBLIC_URL}/api/v1/auth/confirmation/${id}/${token}`;
      await transporter.sendMail({
        from: process.env.O_EMAIL,
        to: email,
        subject: "Confirmar Email || Heippi Api",
        html: `<h1>Confirma tu email</h1> <p>Hola ${name},</p><p>Solo haz click en el siguiente enlace <a href=${url}>${url}</a>`
      });
      res.status(201).json({ message: `Usuario registrado exitosamente, se envió un correo electrónico a ${email} para confirmación de la cuenta` });
    }
    next({ message: "Error creando usuario" });
  } catch (error) {
    next(error)
  }
};

//Dado que el doctor es registrado a partir de un hospital, el controlador genera una clave aleatoria, envia información al servicio y espera a la respuesta para enviar un correo electrónico con los datos obtenidos y que el usuario pueda cambiar por primera vez la contraseña aleatoria

const registerDoctor = async (req, res, next) => {
  try {
    const newDoctor = req.body;
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      strict: true
    });
    newDoctor.password = password;
    const result = await AuthServices.registerDoctor(newDoctor);
    if (result) {
      const { id, name, email } = result;
      const doctor = { id, name, email, password }
      const url = `${process.env.PUBLIC_URL}/api/v1/auth/password-reset/`;
      await transporter.sendMail({
        from: process.env.O_EMAIL,
        to: email,
        subject: "Establecer nueva contraseña || Heippi Api",
        html: `<h1>Establece una nueva contraseña</h1> <p>Hola ${name},</p><p>Solo haz click en el siguiente enlace <a href=${url}>${url}</a> y utiliza tu correo electronico ${email} y la contraseña temporal ${password} para crear una nueva contraseña.`
      });
      res.status(201).json({ message: "Doctor registrado existosamente", doctor });
    } else {
      next({ message: "Error en el registro de doctor" })
    }
  } catch (error) {
    next(error);
  }
};

// El controlador envia la información recibida a un servicio y si este comprueba que la credenciales son correctas, envia la información del usuario para generar y devolver un token y que el usuario pueda acceder a las rutas protegidas

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
      } else {
        next({ message: "Credenciales erroneas" })
      }
    } else {
      next({ message: "Error en el login" })
    }
  } catch (error) {
    next(error)
  }
};

// El controlador envia el token y id que el usuario recibió en su email al servicio para verificar que sean correctos. De ser así, actualiza el estado del usuario a confirmado permitiendole logearse de ahí en adelante.

const confirmation = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const result = await AuthServices.confirmation(id, token);
    if (result) {
      await UsersServices.updateById(id, { confirmed: true, token: null });
      res.json({ message: "Usuario confirmó su correo exitosamente" })
    } else {
      next({ message: "Error en la confirmación de correo" });
    }
  } catch (error) {
    next(error)
  }
};

// Controlador para cuando el usuario sabe su contraseña pero igual quiere cambiarla. Envia la información al servicio para comprobar que su contraseña actual es correcta y de ser así, la reemplaza por la nueva.

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

//En el caso de no recordar la contraseña, el usuario recibe un correo con un enlace para recuperar la cuenta, parecido al proceso de confirmación de la cuenta

const passwordRecovery = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UsersServices.getByEmail(email);
    if (user) {
      const { id, email, name } = user;
      const userData = { id, email };
      const token = await AuthServices.genToken(userData)
      const newProps = { token, confirmed: false };
      await UsersServices.updateByEmail(email, newProps);
      const url = `${process.env.PUBLIC_URL}/api/v1/auth/recover-password/${id}/${token}`;
      await transporter.sendMail({
        from: process.env.O_EMAIL,
        to: user.email,
        subject: "Recuperar contraseña || Heippi Api",
        html: `<h1>Recupera tu email</h1> <p>Hola ${name},</p><p>Solo haz click en el siguiente enlace <a href=${url}>${url}</a>`
      });
      res.json({ message: `Se envió correo electrónico a ${email} para recuperación de contraseña` })
    } else {
      next({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    next(error)
  }
};

// El controlador recibe la información después de que el usuario haya abierto el enlace que llegó en su correo para poder crear una nueva contraseña
const recoveredPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;
    const result = await AuthServices.confirmation(id, token);
    if (result) {
      await UsersServices.updateById(id, { confirmed: true, token: null, password: newPassword });
      res.json({ message: "Usuario actualizó su contraseña exitosamente" })
    } else {
      next({ message: "Error en la actualización de la contraseña" });
    }
  } catch (error) {
    next(error)
  }
};

// El controlador recibe el email, la contraseña aleatoria y la nueva. Si esta información es correcta, el servicio reemplaza la contraseña aleatoria por la nueva.

const firstLoginReset = async (req, res, next) => {
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

module.exports = { register, login, confirmation, passwordReset, passwordRecovery, recoveredPassword, registerDoctor, firstLoginReset };