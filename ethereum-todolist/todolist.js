import web3 from './web3'
import TodoList from './build/contracts/TodoList.json'

const instance = new web3.eth.Contract(
  TodoList.abi,
  '0x579109a34e39466c46d288b4d8e5189969b04f02'
)

export default instance
