import { AutehnticationParams } from '../../../domain/usecases/authentication'

export type HttpPostParams = {
  url: string
  body: AutehnticationParams
}

export interface IHttpPostClient{
  post(params: HttpPostParams): Promise<void>
}
