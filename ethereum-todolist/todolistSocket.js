import web3Socket from './web3Socket'
import TodoList from './build/contracts/TodoList.json'

const instance = new web3Socket.eth.Contract(
  TodoList.abi,
  '0x579109a34e39466c46d288b4d8e5189969b04f02'
)

export default instance
