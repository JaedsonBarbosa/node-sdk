import { BaseAPI } from './baseAPI'

export class MerchantAPI extends BaseAPI {
  constructor(merchantKey: string, secretKey: string) {
    const headers = {
      'X-Merchant-Key': merchantKey,
      'X-Secret-Key': secretKey,
    }

    super('merchant', headers)
  }

  public invoiceInfo(invoiceHash: string) {
    const body = { invoice_hash: invoiceHash }
    return this.executeRequest('GET', 'invoice-info', body)
  }

  public processInvoices(invoiceHashes: string[]) {
    const body = { invoice_hashes: invoiceHashes }
    return this.executeRequest('POST', 'process-invoices', body)
  }

  public forwardInvoices(invoiceHashes: string[]) {
    const body = { invoice_hashes: invoiceHashes }
    return this.executeRequest('POST', 'forward-invoices', body)
  }

  public generateInvoiceAddress(invoiceHash: string, cryptocurrency: string) {
    const body = {
      invoice_hash: invoiceHash,
      cryptocurrency: cryptocurrency,
    }
    return this.executeRequest('POST', 'generate-invoice-address', body)
  }

  public createInvoice(
    cryptocurrencies: string[],
    currency: string,
    targetValue?: number,
    title?: string,
    description?: string
  ) {
    const body: any = { cryptocurrencies: JSON.stringify(cryptocurrencies) }
    if (currency) body.currency = currency
    if (targetValue) body.target_value = targetValue
    if (title) body.title = title
    if (description) body.description = description

    return this.executeRequest('POST', 'create-invoice', body)
  }

  public estimateInvoicePrice(
    cryptocurrencies: string[],
    currency?: string,
    targetValue?: number
  ) {
    const body: any = { cryptocurrencies: JSON.stringify(cryptocurrencies) }
    if (currency) body.currency = currency
    if (targetValue) body.target_value = targetValue
    return this.executeRequest('POST', 'estimate-invoice-price', body)
  }

  public recoverInvoicePrivateKey(invoiceHash: string, cryptocurrency: string) {
    const body = {
      invoice_hash: invoiceHash,
      cryptocurrency: cryptocurrency,
    }
    return this.executeRequest('POST', 'recover-invoice-private-key', body)
  }
}
