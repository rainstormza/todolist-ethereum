const HDWalletProvider = require('truffle-hdwallet-provider')
const provider = new HDWalletProvider(
  'network mixture slide gym oyster fire enjoy foot chef expire grace slender',
  'https://rinkeby.infura.io/dMhh1kphvmfyEd8NTvfG'
)

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: provider,
      network_id: '4' // Rinkeby ID 4
    }
  }
}
