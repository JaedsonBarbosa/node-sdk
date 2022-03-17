const WalletAPI = require('../dist/index').WalletAPI
const client = new WalletAPI(
  'eVXxYITpKBMELRpj',
  'RKEHxk8Bq4Q5KVCUyqKqHcpzfXfqJj4d+zZfi//d8js=',
  'trx'
)

;(async function () {
  try {
    const depositAddresses = await client.getDepositAddresses()
    console.log('Deposit addresses:')
    console.log(depositAddresses)

    const balance = await client.getBalance()
    console.log('Balance:')
    console.log(balance)

    const addressValidation = await client.validateAddresses(['eVXxYITpKBMELRpj'])
    console.log('Address validation result:')
    console.log(addressValidation)

    const transactionDestination = 'eVXxYITpKBMELRpj'
    const transactionBody = { [transactionDestination]: 1 }
    const transaction = await client.sendTransaction(transactionBody)
    console.log('Transaction result:')
    console.log(transaction)
  } catch (error) {
    console.log(error.message ?? error)
  }
})()
