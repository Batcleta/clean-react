import { faker } from '@faker-js/faker'
import { AutehnticationParams } from '@/domain/usecases/authentication'

type httpPostParams = {
  url: string
  body?: AutehnticationParams
}

interface IHttpPostClient{
  post(params: httpPostParams): Promise<void>
  // post(url: string): Promise<AccountModel> retorno real
}

// Criação da classe authentication
class RemoteAuthentification {
  // urlTeste?: string
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth (params: AutehnticationParams): Promise<void> {
    // this.urlTeste = this.url
    // return Promise.resolve()
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}

class HttpPostClientSpy implements IHttpPostClient {
  url?: string
  body?: object
  async post (params: httpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}

type MakeSutSubTypes = {
  sut: RemoteAuthentification
  httpPostClient: HttpPostClientSpy
}

const mockAuthentication = (): AutehnticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const makeSut = (url: string = 'valid_url'): MakeSutSubTypes => {
  const httpPostClient = new HttpPostClientSpy()
  const sut = new RemoteAuthentification(url, httpPostClient)
  return { sut, httpPostClient }
}

describe('RemoteAuthentification', () => {
  test('should return correct url', async () => {
    const url: string = faker.internet.url()
    const { sut, httpPostClient } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClient.url).toBe(url)
  })

  // Errrrrrou
  // test('should return correct body', async () => {
  //   const url: string = 'valid_url'
  //   const body = { email: 'valid_email', password: 'valid_password' }
  //   const { sut, httpPostClient } = makeSut(url, body)
  //   await sut.auth()
  //   expect(httpPostClient.body).toBe(body)
  // })

  test('should return correct body', async () => {
    const { sut, httpPostClient } = makeSut()
    const body = mockAuthentication()
    await sut.auth(body)
    expect(httpPostClient.body).toEqual(body)
  })
})
