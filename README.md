# CryptoUnifier Node.JS SDK

A simple Node.JS SDK for interacting with [Crypto Unifier](https://cryptounifier.io) API V1.

## Installation

You can install the package via NPM:

```bash
npm install @cryptounifier/node-sdk
```

## Usage

### Using the Wallet API client

You can use the `WalletAPI` class for convenient access to API methods. Some are defined in the code:

```node
const WalletAPI = require('@cryptounifier/node-sdk').WalletAPI

const client = new WalletAPI('WALLET_KEY', 'SECRET_KEY', 'btc');

client.getBalance().then((balance) => (console.log(balance)));

client.getDepositAddresses().then((depositAddresses) => (console.log(depositAddresses)));
```

### Using the Merchant API client

You can use the `MerchantAPI` class for convenient access to API methods. Some are defined in the code:

```node
const MerchantAPI = require('@cryptounifier/node-sdk').MerchantAPI;

const client = new MerchantAPI('MERCHANT_KEY', 'SECRET_KEY');

client.createInvoice(['btc', 'bch', 'eth']).then((invoice) => console.log(invoice));
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
