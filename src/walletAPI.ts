import { BaseAPI } from './baseAPI'

export class WalletAPI extends BaseAPI {
  constructor(walletKey: string, secretKey: string, cryptoSymbol: string) {
    const headers = {
      'X-Wallet-Key': walletKey,
      'X-Secret-Key': secretKey,
    }

    super(`wallet/${cryptoSymbol}`, headers)
  }

  public getBlockchainInfo() {
    return this.executeRequest('GET', 'blockchain-info')
  }

  public getTransactionInfo(txid: string) {
    return this.executeRequest('GET', 'transaction-info', { txid })
  }

  public getDepositAddresses() {
    return this.executeRequest('GET', 'deposit-addresses')
  }

  public getBalance() {
    return this.executeRequest('GET', 'balance')
  }

  public validateAddresses(
    addresses: string[],
    validateActivation?: boolean,
  ) {
    const body: any = { addresses: JSON.stringify(addresses) }
    if (validateActivation) body.validate_activation = validateActivation
    return this.executeRequest('POST', 'validate-addresses', body)
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
