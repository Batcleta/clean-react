// Todos os casos de Remote irão fazer requisições http

import { IHttpPostClient } from 'domain/data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    class HttpPostClistSpy implements IHttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpClientSpy = new HttpPostClistSpy()
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()
    // Testar se a implementação da abstração da requisição de post, que será injetada dentro de RemoteAuthentication
    // está recebendo a utl que é passada como atributo para o construtor da classe RemoteAuthentication
    expect(httpClientSpy.url).toBe(url)
  })
})
