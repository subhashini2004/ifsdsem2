const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://subhashininbsc22:subhashinireddy@cluster0.lpilqnv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Define the schema for City
const citySchema = new mongoose.Schema({
  name: String,
  cost: Number
});

// Define the schema for Leg
const legSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
});

// Define the schema for Route
const routeSchema = new mongoose.Schema({
  legs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leg' }]
});

// Define the models
const City = mongoose.model('City', citySchema);
const Leg = mongoose.model('Leg', legSchema);
const Route = mongoose.model('Route', routeSchema);

// CRUD operations

// Create a city
async function createCity(name, cost) {
  const city = new City({ name, cost });
  await city.save();
  console.log('City created:', city);
  return city;
}

// Create a leg
async function createLeg(source, destination) {
  const leg = new Leg({ source, destination });
  await leg.save();
  console.log('Leg created:', leg);
  return leg;
}

// Create a route with legs
async function createRoute(legs) {
  const route = new Route({ legs });
  await route.save();
  console.log('Route created:', route);
  return route;
}

// Read a route and calculate the total cost of the trip
async function calculateTotalCost(routeId) {
  const route = await Route.findById(routeId).populate('legs', 'source destination');
  let totalCost = 0;
  for (const leg of route.legs) {
    const sourceCity = await City.findById(leg.source);
    const destinationCity = await City.findById(leg.destination);
    totalCost += sourceCity.cost + destinationCity.cost;
  }
  console.log('Total cost of the trip:', totalCost);
  return totalCost;
}

// Update the cost of a city
async function updateCityCost(cityId, newCost) {
  const city = await City.findByIdAndUpdate(cityId, { cost: newCost }, { new: true });
  console.log('City updated:', city);
  return city;
}

// Delete a route and its associated legs
async function deleteRoute(routeId) {
  const route = await Route.findByIdAndRemove(routeId);
  await Leg.deleteMany({ _id: { $in: route.legs } });
  console.log('Route deleted:', route);
}

// Usage example
async function example() {
  // Create cities
  const city1 = await createCity('City 1', 100);
  const city2 = await createCity('City 2', 200);
  const city3 = await createCity('City 3', 300);

  // Create legs
  const leg1 = await createLeg(city1._id, city2._id);
  const leg2 = await createLeg(city2._id, city3._id);

  // Create route
  const route = await createRoute([leg1._id, leg2._id]);

  // Calculate total cost
  await calculateTotalCost(route._id);

  // Update city cost
  await updateCityCost(city2._id, 250);

  // Recalculate total cost
  await calculateTotalCost(route._id);

  // Delete route
  await deleteRoute(route._id);
}

// Run the example
example()
  .then(() => mongoose.disconnect())
  .catch(error => console.error('Error:', error));
