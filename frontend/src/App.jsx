import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:8000/api/tasks/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Task Tracker Pro</h1>
      <p>Frontend is talking to Vite. Backend is ready on Django.</p>

      {loading && <p>Loading tasks...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Error loading tasks: {error}
        </p>
      )}

      {!loading && !error && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> – {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

