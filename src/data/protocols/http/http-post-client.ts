import { AutehnticationParams } from '@/domain/usecases/authentication'
import { HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body: AutehnticationParams
}

export interface IHttpPostClient{
  post(params: HttpPostParams): Promise<HttpResponse
  >
}
