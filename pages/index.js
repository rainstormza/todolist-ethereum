import React, { Component } from 'react'
import web3 from '../ethereum-todolist/web3'
import todoList from '../ethereum-todolist/todolist'
import todoListSocket from '../ethereum-todolist/todolistSocket'

class Index extends Component {
  state = {
    account: '',
    content: '',
    tasks: []
  }

  static async getInitialProps() {
    const taskIds = await todoList.methods.getTaskIds().call()
    const tasks = await Promise.all(
      taskIds.map(id => {
        return todoList.methods.getTask(id).call()
      })
    )
    const transformTaskData = tasks.map(item => {
      return {
        id: item[0],
        date: item[1],
        content: item[2],
        done: item[3]
      }
    })

    return { tasks: transformTaskData, taskIds }
  }

  async componentDidMount() {
    // console.log(this.props)
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0],
      tasks: this.props.tasks
    })

    this.taskCreatedSubscription = await todoListSocket.events.TaskCreated(
      { fromBlock: 'latest' },
      async (error, event) => {
        if (!error) {
          console.log('event: ', event)
          const id = event.returnValues.id
          const newTask = await todoList.methods.getTask(id).call()

          const transformNewTask = {
            id: newTask[0],
            date: newTask[1],
            content: newTask[2],
            done: newTask[3]
          }
          const tasks = [
            ...this.state.tasks.slice(0, id),
            transformNewTask,
            ...this.state.tasks.slice(id)
          ]
          console.log('tasks: ', tasks)
          this.setState({
            tasks
          })
        }
      }
    )

    this.taskStatusToggledSubscription = await todoListSocket.events.TaskStatusToggled(
      { fromBlock: 'latest' },
      async (error, event) => {
        if (!error) {
          console.log('event: ', event)
          const id = parseInt(event.returnValues.id)
          const newTaskToggle = await todoList.methods.getTask(id).call()

          const transformNewTaskToggle = {
            id: newTaskToggle[0],
            date: newTaskToggle[1],
            content: newTaskToggle[2],
            done: newTaskToggle[3]
          }
          const tasks = [...this.state.tasks]
          tasks[id - 1] = transformNewTaskToggle
          console.log('tasks: ', tasks)
          this.setState({
            tasks
          })
        }
      }
    )
  }

  componentWillMount() {
    if (this.taskCreatedSubscription) {
      this.taskCreatedSubscription.unsubscribe((error, success) => {
        if (success) console.log('Successfully unsubscribed!')
      })
    }
  }

  createTask = async () => {
    await todoList.methods.createTask(this.state.content).send({
      from: this.state.account,
      gas: '1000000'
    })
    this.setState({
      content: ''
    })
  }

  toggleTaskStatus = async id => {
    await todoList.methods.toggleTaskStatus(id).send({
      from: this.state.account,
      gas: '1000000'
    })
  }

  render() {
    return (
      <div>
        <div>Welcome to next.js!</div>
        <div>
          <input
            type="text"
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
          <button onClick={this.createTask}>add</button>
        </div>

        {this.state.tasks.map(item => {
          return (
            <p
              style={{ textDecoration: item.done ? 'line-through' : '' }}
              key={item.id}
            >
              {item.content}
              <span>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => this.toggleTaskStatus(item.id)}
                />
              </span>
            </p>
          )
        })}
      </div>
    )
  }
}

export default Index
