import { AutehnticationParams } from 'domain/usecases/authentication'
import { IHttpPostClient } from '../../protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth (params: AutehnticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params })
  }
}
