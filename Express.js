const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://subhashininbsc22:subhashinireddy@cluster0.lpilqnv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for routes
const routeSchema = new mongoose.Schema({
  name: String,
  legs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Leg',
    },
  ],
});

// Create a schema for legs
const legSchema = new mongoose.Schema({
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
  ],
  cost: Number,
});

// Create a schema for cities
const citySchema = new mongoose.Schema({
  name: String,
});

// Create models for routes, legs, and cities
const Route = mongoose.model('Route', routeSchema);
const Leg = mongoose.model('Leg', legSchema);
const City = mongoose.model('City', citySchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a route
app.post('/routes', async (req, res) => {
  try {
    const { name, legs } = req.body;

    const route = new Route({ name, legs });
    const savedRoute = await route.save();

    res.json(savedRoute);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all routes
app.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find().populate('legs');
    res.json(routes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get a route by ID
app.get('/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id).populate('legs');

    if (!route) {
      return res.status(404).send('Route not found');
    }

    res.json(route);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a route
app.put('/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, legs } = req.body;

    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      { name, legs },
      { new: true }
    ).populate('legs');

    if (!updatedRoute) {
      return res.status(404).send('Route not found');
    }

    res.json(updatedRoute);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a route
app.delete('/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Route.findByIdAndRemove(id);

    if (!deletedRoute) {
      return res.status(404).send('Route not found');
    }

    res.send(`Route with ID ${id} deleted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Calculate the total cost of a route
app.get('/routes/:id/total-cost', async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id).populate({
      path: 'legs',
      populate: {
        path: 'cities',
        model: 'City',
      },
    });

    if (!route) {
      return res.status(404).send('Route not found');
    }

    let totalCost = 0;

    for (const leg of route.legs) {
      totalCost += leg.cost;
    }

    res.json({ totalCost });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
