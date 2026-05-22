const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// మీ MongoDB కనెక్షన్ స్ట్రింగ్ ఇక్కడ ఉంటుంది
// ఈ లైన్‌ని ఇలాగే కాపీ పేస్ట్ చేయండి (సింగిల్ కోట్స్ తో)
mongoose.connect('mongodb+srv://mallidikavya25_db_user:Kavya123@cluster0.cxmpmkt.mongodb.net/taskManagerDB?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected successfully!'))
  .catch(err => console.log(err));
// టాస్క్ మోడల్ (Schema)
const Task = mongoose.model('Task', new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}));

// 1. అన్నీ టాస్క్‌లు చూడటానికి (GET)
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// 2. కొత్త టాస్క్ యాడ్ చేయడానికి (POST)
app.post('/api/tasks', async (req, res) => {
    const newTask = new Task({ title: req.body.title });
    await newTask.save();
    res.json(newTask);
});

// 3. టాస్క్ డిలీట్ చేయడానికి (DELETE)
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. టాస్క్ స్టేటస్ మార్చడానికి (PATCH)
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));