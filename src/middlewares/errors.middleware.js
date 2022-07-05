import AppError from './../config/error.js';

function ExceptionHandler(error, _req, res, _next) {
  console.log(`[ERROR] ${error.log ?? error}`);
  return error instanceof AppError
    ? res.status(error.statusCode).send({
        message: error.message,
        detail: error.detail,
      })
    : res.status(500).send({
        message: `Internal server error`,
        detail: error,
      });
}

export default ExceptionHandler;
