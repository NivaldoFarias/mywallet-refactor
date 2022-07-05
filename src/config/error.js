export default class AppError {
  log;
  statusCode;
  message;
  detail;
  constructor(log, statusCode, message, detail) {
    this.log = log;
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}
