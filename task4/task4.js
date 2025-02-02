let plants = [];
let colors = [];

do {
  let name = getStringData("Enter name of the plant");
  if (name === null) break;

  let color = getStringData("Enter color of the plant");
  if (color === null) break;

  let calories = getCalories();
  if (calories === null) break;

  let colorFind = colors.find((c) => c.name === color);
  if (!colorFind) {
    colorFind = { name: color };
    colors.push(colorFind);
  }

  plants.push({ name, color, calories });
} while (confirm("Do you want to continue with input?"));

const groupedPlantsByColor = plants.reduce((acc, plant) => {
  if (!acc[plant.color]) {
    acc[plant.color] = [];
  }

  acc[plant.color].push(plant);

  return acc;
});

console.log("Plants grouped by color: ");
console.log(groupedPlantsByColor);

countCaloriesByColor();

console.log("");
console.log("Calories by color");
colors.forEach((color) => {
  console.log(`Color: ${color.name}, total calories: ${color.totalCalories}`);
});

const sortedColors = colors.sort((a, b) => a.name.localeCompare(b.name));
console.log("Sorted colors alpha");

sortedColors.forEach((color) => {
  console.log("color name: ", color.name, color.totalCalories);
});

function getStringData(promptText) {
  let isValid = false;

  while (!isValid) {
    let data = prompt(promptText);

    if (data?.trim() === "") {
      alert(`field cant be empty`);
      continue;
    }

    if (/\d/.test(data)) {
      alert("Field can t contain numbers.");
      continue;
    }

    isValid = true;

    return data;
  }
}

function getCalories() {
  let isValid = false;
  while (!isValid) {
    let calories = prompt("Enter calories of the plant");
    let parsedCalories = parseFloat(calories.replace(",", "."));

    if (parsedCalories <= 0 || isNaN(parsedCalories)) {
      alert("calories cant be less or equal to 0");
      continue;
    }

    isValid = true;
    return parsedCalories;
  }
}

function countCaloriesByColor() {
  colors.forEach((color) => {
    color.totalCalories = plants
      .filter((plant) => plant.color === color.name)
      .reduce((sum, plant) => sum + plant.calories, 0);
  });

  let topThreeColors = [...colors]
    .sort((a, b) => b.totalCalories - a.totalCalories)
    .slice(0, 3);

  console.log("Top 3 colors by the most calories: ");
  topThreeColors.forEach((color) => {
    console.log(
      `Color: ${color.name} with total calories: ${color.totalCalories}`
    );
  });
}
