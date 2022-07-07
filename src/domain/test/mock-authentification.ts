import { faker } from '@faker-js/faker'
import { AutehnticationParams } from '../usecases/authentication'

export const mockAuthentification = (): AutehnticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
