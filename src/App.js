import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios తో రిక్వెస్ట్ పంపుతున్నాం
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description
      });
      
      if (response.status === 201) {
        alert('టాస్క్ సక్సెస్‌ఫుల్‌గా యాడ్ అయ్యింది!');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('సర్వర్ ఎర్రర్: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="app-container">
      <h1>📝 టాస్క్ మేనేజర్</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input 
          type="text" placeholder="టాస్క్ పేరు..." 
          value={title} onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="వివరాలు..." 
          value={description} onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">టాస్క్ యాడ్ చెయ్</button>
      </form>
    </div>
  );
}

export default App;