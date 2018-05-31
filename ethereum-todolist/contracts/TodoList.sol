pragma solidity ^0.4.24;
contract TodoList {
  struct Task {
    uint id;
    uint date;
    string content;
    bool done;
  }

  uint private lastTaskId;
  uint[] private taskIds;
  mapping(uint => Task) private tasks;
  
  event TaskCreated(uint id, uint date, string content);
  event TaskStatusToggled(uint id, bool done);

  function createTask(string _content) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, now, _content);
  }

  function toggleTaskStatus(uint id) taskExist(id) public {
    tasks[id].done = !tasks[id].done;
    emit TaskStatusToggled(id, tasks[id].done);
  }

  function getTaskIds() public view returns(uint[]) {
    return taskIds;
  }

  function getTask(uint id) taskExist(id) public view returns(uint, uint, string, bool) {
    return (id, tasks[id].date, tasks[id].content, tasks[id].done);
  }

  modifier taskExist(uint id) {
    require (tasks[id].id != 0);
    _;
  }
}