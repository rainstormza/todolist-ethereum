import Web3 from 'web3'

const provider = new Web3.providers.WebsocketProvider(
  'wss://rinkeby.infura.io/ws'
)

const web3Socket = new Web3(provider)

export default web3Socket
