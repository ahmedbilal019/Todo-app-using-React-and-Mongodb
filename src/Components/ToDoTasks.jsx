function ToDoTasks({
  task,
  deleteTask,
  toggleComplete,
  startEditing,
  saveEdit,
  cancelEdit,
  editingId,
  editingText,
  setEditingText,
}) {
  const isEditing = editingId === task._id;

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      {/* <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task._id)}
      /> */}

      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <div className="task-info">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task._id)}
          />
          <p className={`task-desc ${task.completed ? "strike" : ""}`}>
            {task.taskName}
          </p>
        </div>
      )}

      <div className="controls">
        {isEditing ? (
          <>
            <button className="btnSave" onClick={() => saveEdit(task._id)}>
              SAVE
            </button>
            <button className="btnCancel" onClick={cancelEdit}>
              CANCEL
            </button>
          </>
        ) : (
          <>
            <button
              className="btnEdit"
              onClick={() => startEditing(task._id, task.taskName)}
            >
              EDIT
            </button>
            <button className="btnDelete" onClick={() => deleteTask(task._id)}>
              DELETE
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default ToDoTasks;
