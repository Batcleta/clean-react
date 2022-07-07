import { AccountModel } from '../models/account-model'

export type AutehnticationParams = {
  email: string
  password: string
}

export interface IAuthentication{
  auth(params: AutehnticationParams): Promise<AccountModel>
}
