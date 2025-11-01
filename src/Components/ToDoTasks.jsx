import React from "react";

function ToDoTasks({ task, deleteTask }) {
  return (
    <div className="task">
      <p className="task-desc">{task.taskName}</p>

      <div className="controls">
        <button
          className="btnDelete"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          DELETE
        </button>
        <button
          className="btnEdit"
          onClick={() => {
            editTask();
          }}
        >
          EDIT
        </button>
      </div>
    </div>
  );
}

export default ToDoTasks;
