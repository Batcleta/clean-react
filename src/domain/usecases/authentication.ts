import { AccountModel } from './models/account-model'

type AutehnticationParams = {
  email: string
  password: string
}

export interface IAuthentication{
  auth(params: AutehnticationParams): Promise<AccountModel>
}
