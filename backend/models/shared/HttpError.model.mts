export class HttpError {
  statusCode: number
  message: string
  constructor(statusCode: number = 500, message: string = 'Something went wrong, please try again') {
    this.statusCode = statusCode
    this.message = message
  }
}
