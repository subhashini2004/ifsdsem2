const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb+srv://subhashininbsc22:suhashinireddy@cluster0.lpilqnv.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'travel';

// Collection names
const routesCollection = 'routes';
const legsCollection = 'legs';
const citiesCollection = 'cities';

// MongoDB client
const client = new MongoClient(url, { useNewUrlParser: true });

// Function to calculate the total cost of a route
async function calculateTotalCost(routeId) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to the server');

    // Get the specified route from the database
    const route = await client.db(dbName).collection(routesCollection).findOne({ _id: routeId });

    // Calculate the total cost of the trip
    let totalCost = 0;
    for (const legId of route.legs) {
      const leg = await client.db(dbName).collection(legsCollection).findOne({ _id: legId });
      const cityA = await client.db(dbName).collection(citiesCollection).findOne({ _id: leg.cityA });
      const cityB = await client.db(dbName).collection(citiesCollection).findOne({ _id: leg.cityB });
      totalCost += cityA.cost + cityB.cost;
    }

    return totalCost;
  } catch (err) {
    console.log('An error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Disconnected from the server');
  }
}

// Function to create a new route
async function createRoute(routeData) {
  try {
    await client.connect();
    console.log('Connected successfully to the server');

    const result = await client.db(dbName).collection(routesCollection).insertOne(routeData);
    console.log(`Created new route with ID: ${result.insertedId}`);
  } catch (err) {
    console.log('An error occurred:', err);
  } finally {
    await client.close();
    console.log('Disconnected from the server');
  }
}

// Function to update an existing route
async function updateRoute(routeId, updateData) {
  try {
    await client.connect();
    console.log('Connected successfully to the server');

    const result = await client.db(dbName).collection(routesCollection).updateOne({ _id: routeId }, { $set: updateData });
    console.log(`Updated route with ID: ${routeId}`);
  } catch (err) {
    console.log('An error occurred:', err);
  } finally {
    await client.close();
    console.log('Disconnected from the server');
  }
}

// Function to delete a route
async function deleteRoute(routeId) {
  try {
    await client.connect();
    console.log('Connected successfully to the server');

    const result = await client.db(dbName).collection(routesCollection).deleteOne({ _id: routeId });
    console.log(`Deleted route with ID: ${routeId}`);
  } catch (err) {
    console.log('An error occurred:', err);
  } finally {
    await client.close();
    console.log('Disconnected from the server');
  }
}

// Example usage

// Calculate total cost
const routeId = '60c3a4b0d572350e8c2f5e8a'; // Replace with the actual route ID from the database
calculateTotalCost(routeId)
  .then(totalCost => console.log(`Total cost of the trip: ${totalCost}`))
  .catch(err => console.log(err));

// Create a new route
const newRoute = {
  legs: ['leg1', 'leg2', 'leg3'],
  // Add other properties as needed
};
createRoute(newRoute);

// Update an existing route
const routeToUpdateId = '60c3a4b0d572350e8c2f5e8a'; // Replace with the actual route ID to update
const updateData = {
  // Update properties as needed
};
updateRoute(routeToUpdateId, updateData);

// Delete a route
const routeToDeleteId = '60c3a4b0d572350e8c2f5e8a'; // Replace with the actual route ID to delete
deleteRoute(routeToDeleteId);
