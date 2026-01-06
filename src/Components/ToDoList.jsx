import React, { useState, useEffect } from "react";
import ToDoTasks from "./ToDoTasks.jsx";

const API_URL = "http://localhost:3020/api/todos";

function ToDoList() {
  const [todo, setTodo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [newTask, setNewTask] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.length === 0) {
      alert("Enter something before Adding task!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: newTask,
          completed: false,
        }),
      });
      const newTodo = await response.json();
      setTodo([newTodo, ...todo]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setTodo(todo.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function toggleComplete(id) {
    try {
      await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
      });
      setTodo(
        todo.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  function startEditing(id, text) {
    setEditingId(id);
    setEditingText(text);
  }

  async function saveEdit(id) {
    if (!editingText.trim()) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: editingText,
        }),
      });
      setTodo(
        todo.map((task) =>
          task._id === id ? { ...task, taskName: editingText } : task
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  return (
    <>
      <div className="toDoList">
        <h1>ToDo List</h1>
        <div className="inputContainer">
          <input
            className="inputField"
            type="text"
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
            <ToDoTasks
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              startEditing={startEditing}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ToDoList;
