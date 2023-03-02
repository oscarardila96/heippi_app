// El middleware de error maneja los errores para más precisión y certeza de cuando la aplicación no funciona.

const error = (error, req, res, next) => {
  res.status(400).json(error.message);
};

module.exports = error;