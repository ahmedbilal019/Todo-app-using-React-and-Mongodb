import React, { useState } from "react";
import ToDoTasks from "./ToDoTasks.jsx";

function ToDoList() {
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  let todoInput = document.getElementById("inputTask");
  // console.log(todoInput.value);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function addTask() {
    const task = {
      id: todo.length === 0 ? 1 : todo[todo.length - 1].id + 1,
      taskName: newTask,
    };
    if (newTask.length === 0) {
      alert("Enter something before Adding task!");
    } else {
      const newTodoList = [...todo, task];
      setTodo(newTodoList);
      setNewTask("");
    }
  }
  function deleteTask(id) {
    setTodo(todo.filter((task) => task.id !== id));
  }

  return (
    <>
      <div className="toDoList">
        <h1>ToDo List </h1>
        <div className="inputContainer">
          <input
            className="inputField"
            type="text"
            name=""
            id="inputTask"
            placeholder="enter task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="btnAdd-task" onClick={addTask}>
            ADD
          </button>
        </div>
        <div>
          {todo.map((task) => (
            <ToDoTasks key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ToDoList;
