const TodoList = artifacts.require('TodoList.sol')

module.exports = function(deployer, network, accounts) {
  return deployer.then(() => {
    return deployer.deploy(TodoList)
  })
}
