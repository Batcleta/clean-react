// Todos os casos de Remote irão fazer requisições http
import { mockAuthentification } from '@/domain/test/mock-authentification'
import { HttpPostClientSpy } from '@/data/test/mock-http-post-client'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  // SUT - System under test
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const { sut, httpPostClientSpy } = makeSut()
    await sut.auth(mockAuthentification())
    // Testar se a implementação da abstração da requisição de post, que será injetada dentro de RemoteAuthentication
    // está recebendo a utl que é passada como atributo para o construtor da classe RemoteAuthentication
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const body = mockAuthentification()
    await sut.auth(body)
    expect(httpPostClientSpy.body).toEqual(body)
  })
})
