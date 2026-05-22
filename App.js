import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]); // టాస్క్ లని స్టోర్ చేయడానికి

  // టాస్క్ లని లోడ్ చేయడానికి
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("డేటా లోడ్ అవ్వలేదు:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { title, description });
      if (response.status === 201) {
        alert('సక్సెస్!');
        setTitle('');
        setDescription('');
        fetchTasks(); // కొత్త టాస్క్ యాడ్ అయ్యాక లిస్ట్ ని రిఫ్రెష్ చేస్తుంది
      }
    } catch (error) {
      alert('ఎర్రర్: ' + error.message);
    }
  };

  return (
    <div className="app-container">
      <h1>📝 టాస్క్ మేనేజర్</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input type="text" placeholder="టాస్క్ పేరు..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="వివరాలు..." value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">టాస్క్ యాడ్ చెయ్</button>
      </form>

      {/* టాస్క్ లిస్ట్ */}
      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;