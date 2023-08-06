# ethers-cctx
This repo contains some basic examples of few functionalities provided by the ethers.js and cctx  libraries.


# Making API server using two libraries.

## 1. ethers.js

1. <b>returning boolean of wallet address is valid.</b>

This route returns if the provided string is a valid Ethereum address.

route: (http:localhost:3000/is-address)

return type: {
addr: string,
isValid: bool
}

method: POST

body: {
address: string
}


2. <b>creating wallet</b>

   This route creates a new Ethereum address and returns the address and private key of the newly generated wallet.

route: (http:localhost:3000/create-wallet)

return type: {
address: string,
private key: string,
message: string
}

method: POST

body: {}

3. Get latest 1000 transactions of Ethereum, return the result sorted by Ethereum quantity.
   datas
- Transaction hash,
- sender address
- receiver address
- amount of ether transferred
- block number

## 2.  cctx

1. get the list of coin which is tradable on Binance.
2. Get the list of each coin’s average price(**Average price of 100 recent transactions)**