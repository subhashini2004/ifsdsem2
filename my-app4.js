import React, { useState, useEffect } from 'react';

function App() {
  const [route, setRoute] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Fetch route data and calculate total cost
    fetchDataAndCalculateCost();
  }, []);

  const fetchDataAndCalculateCost = () => {
    // Perform API request to fetch route data and legs/cities information
    // Replace with your actual API call or use sample data
    const mockApiResponse = {
      routeId: 1,
      legs: [
        { source: 'City A', destination: 'City B', cost: 10 },
        { source: 'City B', destination: 'City C', cost: 15 },
        { source: 'City C', destination: 'City D', cost: 12 },
      ],
    };

    // Update the route state with fetched data
    setRoute(mockApiResponse.legs);

    // Calculate the total cost of the trip
    const totalCost = mockApiResponse.legs.reduce((acc, leg) => acc + leg.cost, 0);
    setTotalCost(totalCost);
  };

  return (
    <div>
      <h1>Travel App</h1>
      {route.length > 0 ? (
        <div>
          <h2>Route Details:</h2>
          <ul>
            {route.map((leg, index) => (
              <li key={index}>
                Leg {index + 1}: From {leg.source} to {leg.destination}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading route data...</p>
      )}
      <p>Total Cost of the Trip: {totalCost}</p>
    </div>
  );
}

export default App;
