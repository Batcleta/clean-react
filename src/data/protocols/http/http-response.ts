export enum HttpStatusCode {
  noCOntent = 201,
  unauthorized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
