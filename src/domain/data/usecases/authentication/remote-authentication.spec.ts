// Todos os casos de Remote irão fazer requisições http
import { HttpPostClientSpy } from '../../test/mock-http-post-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes={
  sut: RemoteAuthentication
  httpClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const { sut, httpClientSpy } = makeSut()
    await sut.auth()
    // Testar se a implementação da abstração da requisição de post, que será injetada dentro de RemoteAuthentication
    // está recebendo a utl que é passada como atributo para o construtor da classe RemoteAuthentication
    expect(httpClientSpy.url).toBe(url)
  })
})
