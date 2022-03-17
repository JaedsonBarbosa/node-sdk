import { BaseAPI } from './baseAPI'

export class WalletTokenAPI extends BaseAPI {
  constructor(
    walletKey: string,
    secretKey: string,
    cryptoSymbol: string,
    tokenSymbol: string
  ) {
    const headers = {
      'X-Wallet-Key': walletKey,
      'X-Secret-Key': secretKey,
    }

    super(`wallet/${cryptoSymbol}/token/${tokenSymbol}`, headers)
  }

  public getBalance() {
    return this.executeRequest('GET', 'balance')
  }

  public estimateFee(
    destinations: { [id: string]: number },
    feePerByte?: number,
    extraField?: string
  ) {
    const body: any = { destinations: JSON.stringify(destinations) }
    if (feePerByte) body.fee_per_byte = feePerByte
    if (extraField) body.extra_field = extraField

    return this.executeRequest('POST', 'estimate-fee', body)
  }

  public sendTransaction(
    destinations: { [id: string]: number },
    feePerByte?: number,
    extraField?: string
  ) {
    const body: any = { destinations: JSON.stringify(destinations) }
    if (feePerByte) body.fee_per_byte = feePerByte
    if (extraField) body.extra_field = extraField

    return this.executeRequest('POST', 'send-transaction', body)
  }
}
