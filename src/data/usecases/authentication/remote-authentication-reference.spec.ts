import { faker } from '@faker-js/faker'
import { AutehnticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

// == > Http Authentication response == >
enum HttpStatusResponse {
  noCOntent = 201,
  unauthorized = 401
}

type HttpResponse = {
  statusCode: HttpStatusResponse
  body?: any
}
// < == End of Http Authentication response < ==

// == > Implementation of HttpPostCLient == >

type httpPostParams = {
  url: string
  body?: AutehnticationParams
}
interface IHttpPostClient{
  post(params: httpPostParams): Promise<HttpResponse>
  // post(url: string): Promise<AccountModel> retorno real
}

class HttpPostClientSpy implements IHttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusResponse.noCOntent
  }

  async post (params: httpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
//  < == End of Implementation of HttpPostCLient < ==

// == >  Implementation of RemoteAuthentification == >
class RemoteAuthentification {
  // urlTeste?: string
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth (params: AutehnticationParams): Promise<void> {
    // this.urlTeste = this.url
    // return Promise.resolve()
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusResponse.unauthorized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}
// < == end of Implementation of RemoteAuthentification < ==

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

  test('should return correct body', async () => {
    const { sut, httpPostClient } = makeSut()
    const body = mockAuthentication()
    await sut.auth(body)
    expect(httpPostClient.body).toEqual(body)
  })

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClient } = makeSut()
    httpPostClient.response = {
      statusCode: HttpStatusResponse.unauthorized
    }
    const body = mockAuthentication()
    const promise = sut.auth(body)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
