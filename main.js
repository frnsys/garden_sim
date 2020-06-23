const rainfall = 0.2;
const bacteria = 0.2;
const soil = {
  water: 100,
  nutrients: 100,
  drainage: 0.05
};

const plants = [{
  alive: true,
  growth: 0,
  needs: {
    water: 0.1,
    nutrients: 0.1
  }
}, {
  alive: true,
  growth: 0,
  needs: {
    water: 0.2,
    nutrients: 0.3
  }
}];

setInterval(() => {
  // Replenish soil
  soil.water += rainfall;
  soil.water = Math.max(0, soil.water - soil.drainage);
  soil.nutrients += bacteria;

  plants.forEach((plant) => {
    if (plant.alive) {
      // Deduct amount consumed from soil
      let waterConsumed = Math.min(soil.water, plant.needs.water);
      let nutrientsConsumed = Math.min(soil.nutrients, plant.needs.nutrients);
      soil.water -= waterConsumed;
      soil.nutrients -= nutrientsConsumed;

      // Calculate plant health/growth
      // If less than 0, plant is hurt
      let waterSatisfied = 0.1 + (-plant.needs.water + waterConsumed)/plant.needs.water;
      let nutrientsSatisfied = 0.1 + (-plant.needs.nutrients + nutrientsConsumed)/plant.needs.nutrients;
      let growth = Math.min(waterSatisfied, nutrientsSatisfied);
      plant.growth = Math.max(Math.min(plant.growth + growth, 100), 0);
      if (plant.growth <= 0) {
        plant.alive = false;
      }
    }
  });
}, 10);

// Visualization
const plantSize = 20;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  plants.forEach((plant, i) => {
    let from = color(66, 47, 7);
    let to = color(67, 204, 112);
    fill(lerpColor(from, to, plant.growth/100));
    rect(100 + (plantSize+5) * i, 100, plantSize, plantSize);
  });

  noStroke();
  let from = color(48);
  let to = color(10, 132, 255);
  fill(lerpColor(from, to, soil.water/100));
  rect(0, 0, 400, 5);

  to = color(252, 202, 49);
  fill(lerpColor(from, to, soil.nutrients/100));
  rect(0, 5, 400, 5);
}
