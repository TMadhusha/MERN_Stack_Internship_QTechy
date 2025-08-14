require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Component Schema
const ComponentSchema = new mongoose.Schema({
  type: String,
  data: Object
});
const Component = mongoose.model('Component', ComponentSchema);

// API Routes
app.get('/api/components', async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/components', async (req, res) => {
  try {
    const { type, data } = req.body;
    let component = await Component.findOne({ type });

    if (component) {
      component.data = data;
    } else {
      component = new Component({ type, data });
    }

    await component.save();
    res.status(201).json(component);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));