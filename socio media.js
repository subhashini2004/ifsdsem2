// Widget initialization
const socioPediaManager = {
    routes: [],
  
    // Function to create a new route with legs and cities
    createRoute: function (routeName) {
      const route = {
        name: routeName,
        legs: [],
      };
      this.routes.push(route);
      console.log("New route created:", route);
    },
  
    // Function to add a leg with two cities to an existing route
    addLeg: function (routeIndex, city1, city2) {
      const leg = {
        city1: city1,
        city2: city2,
      };
      this.routes[routeIndex].legs.push(leg);
      console.log("Leg added to route:", this.routes[routeIndex]);
    },
  
    // Function to delete a route
    deleteRoute: function (routeIndex) {
      const deletedRoute = this.routes.splice(routeIndex, 1);
      console.log("Route deleted:", deletedRoute);
    },
  
    // Function to update a route name
    updateRouteName: function (routeIndex, newName) {
      this.routes[routeIndex].name = newName;
      console.log("Route name updated:", this.routes[routeIndex]);
    },
  
    // Function to calculate the total cost of a route
    calculateTotalCost: function (routeIndex, costPerLeg) {
      const numLegs = this.routes[routeIndex].legs.length;
      const totalCost = numLegs * costPerLeg;
      console.log("Total cost of the trip:", totalCost);
      return totalCost;
    },
  
    // Function to display all routes
    displayRoutes: function () {
      console.log("Routes:", this.routes);
    },
  };
  
  // Example usage:
  socioPediaManager.createRoute("Trip to Europe");
  socioPediaManager.addLeg(0, "London", "Paris");
  socioPediaManager.addLeg(0, "Paris", "Rome");
  socioPediaManager.calculateTotalCost(0, 100); // Assuming cost per leg is $100
  socioPediaManager.displayRoutes();
  