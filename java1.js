class City {
    constructor(name, cost) {
      this.name = name;
      this.cost = cost;
    }
  }
  
  class Leg {
    constructor(cityA, cityB) {
      this.cityA = cityA;
      this.cityB = cityB;
    }
  
    calculateLegCost() {
      return this.cityA.cost + this.cityB.cost;
    }
  }
  
  class Route {
    constructor() {
      this.legs = [];
    }
  
    addLeg(leg) {
      this.legs.push(leg);
    }
  
    calculateTotalCost() {
      let totalCost = 0;
  
      for (let i = 0; i < this.legs.length; i++) {
        const leg = this.legs[i];
        const legCost = leg.calculateLegCost();
        totalCost += legCost;
      }
  
      return totalCost;
    }
  }
  
  function main() {
    const cityA = new City("City A", 50);
    const cityB = new City("City B", 100);
    const cityC = new City("City C", 75);
  
    const leg1 = new Leg(cityA, cityB);
    const leg2 = new Leg(cityB, cityC);
  
    const route = new Route();
    route.addLeg(leg1);
    route.addLeg(leg2);
  
    const totalCost = route.calculateTotalCost();
  
    console.log(`Total cost of the trip: ${totalCost}`);
  }
  
  main();
  