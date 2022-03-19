import { request } from 'https'
import { stringify } from 'querystring'

export abstract class BaseAPI {
  private readonly defaultUrl = 'https://cryptounifier.io/api/v1/';
  private hostname = ''
  private basepath = ''

  constructor(protected suffix: string, protected readonly headers: any) {
    this.setApiUrl(this.defaultUrl)
  }

  public setApiUrl(apiUrl: string) {
    const url = new URL(apiUrl)
    this.hostname = url.hostname
    this.basepath = url.pathname
  }

  public executeRequest(
    method: 'POST' | 'GET',
    uri: string,
    body?: { [key: string]: any }
  ) {
    return new Promise((resolve, reject) => {
      const postData = method === 'POST' ? stringify(body) : ''

      const options = {
        hostname: this.hostname,
        port: 443,
        path: this.basepath + this.suffix + '/' + uri,
        method,
        headers: this.headers,
      }

      if (method === 'POST') {
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length,
        }
      }

      const req = request(options, (res: any) => {
        res.setEncoding('utf8')
        let body = ''
        res.on('data', (data: any) => (body += data))
        res.on('end', () => {
          if (res.statusCode === 200) {
            const json = JSON.parse(body)
            resolve(json)
          } else {
            try {
              reject(JSON.parse(body))
            } catch {
              reject(body)
            }
          }
        })
      })

      req.on('error', (e: any) => reject(e))

      if (method === 'POST') {
        req.write(postData)
      }
      req.end()
    })
  }
}
