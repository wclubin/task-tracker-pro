import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const API_BASE = "http://localhost:8000/api/tasks/";

  // Load tasks on mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleAddTask(event) {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !dueDate) {
      setError("Title, description, and due date are required.");
      return;
    }

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          due_date: dueDate,
          completed: false,
        }),
      });

      if (!response.ok) throw new Error(`Add failed: ${response.status}`);

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);

      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  }

  async function handleToggleComplete(taskId, currentCompleted) {
    try {
      const response = await fetch(`${API_BASE}${taskId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (!response.ok) throw new Error(`Update failed: ${response.status}`);

      const updatedTask = await response.json();

      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  async function handleDeleteTask(taskId) {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}${taskId}/`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  return (
    <div className="app-root">
      <div className="app-container">
        <h1>Task Tracker Pro</h1>
        <p>React frontend + Django REST API backend.</p>

        {error && <p className="error-text">Error: {error}</p>}

        {/* Add Task Form */}
        <section>
          <h2>Add a new task</h2>
          <form onSubmit={handleAddTask}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              Description:
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label>
              Due date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>

            <button type="submit" className="btn primary-btn">
              Add Task
            </button>
          </form>
        </section>

        {/* Task List */}
        <section>
          <h2>Task history</h2>

          {loading && <p>Loading tasks...</p>}

          {!loading && tasks.length === 0 && <p>No tasks yet.</p>}

          {!loading && tasks.length > 0 && (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div className="task-card">
                    <div className="task-title-row">
                      <span className="task-title">{task.title}</span>
                      {task.completed && (
                        <span className="task-status-completed">Completed</span>
                      )}
                    </div>

                    <div className="task-description">{task.description}</div>

                    <div className="task-meta">
                      Due: {task.due_date} · Completed:{" "}
                      {task.completed ? "Yes" : "No"}
                    </div>

                    <div className="task-buttons">
                      <button
                        type="button"
                        className="btn toggle-btn"
                        onClick={() =>
                          handleToggleComplete(task.id, task.completed)
                        }
                      >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                      </button>

                      <button
                        type="button"
                        className="btn delete-btn"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

