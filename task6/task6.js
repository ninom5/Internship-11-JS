const equipments = [];
let availableEquipment = [];
let unavailableEquipment = [];
let totalPrice = 0;

do {
  let name = getStringData("Enter name of the equipment");
  if (name === null) break;

  let price = getPrice();
  if (price === null) break;

  let status = getStatus("Enter status of the euipment(dostupno/nedostupno)");
  if (status === null) break;

  totalPrice += price;

  equipments.push({ name, price, status });
} while (confirm("Do you want to continue with input?"));

equipments.forEach((equipment, index) => {
  if (equipment.status === "dostupno") availableEquipment.push(equipment);
  else {
    equipment.index = index;
    unavailableEquipment.push(equipment);
  }
});

let totalPriceOfUnAvailable = unavailableEquipment.reduce(
  (sum, equipment) => sum + equipment.price,
  0
);

console.log("Indexes of unavailable equipment: ");

if (unavailableEquipment.length > 0) {
  unavailableEquipment.forEach((equipment) => {
    console.log(equipment.index, equipment.name);
  });
} else console.log("No unavailable equipment");

const sortedByPrice = [...availableEquipment].sort((a, b) => a.price - b.price);
const sortedByName = [...availableEquipment].sort((a, b) =>
  a.name.localeCompare(b.name)
);

console.log("Sorted available equipmetn by price: ");

sortedByPrice.forEach((equipment) => {
  console.log(
    `Price: ${equipment.price}, name: ${equipment.name}, status: ${equipment.status}`
  );
});

console.log("Sorted available equipment by name: ");

sortedByName.forEach((equipment) => {
  console.log(
    `Price: ${equipment.name}, name: ${equipment.price}, status: ${equipment.status}`
  );
});

console.log(
  `Percentage of value of unavailable equipment: ${(
    (totalPriceOfUnAvailable / totalPrice) *
    100
  ).toFixed(2)}`
);

let priceCategories = availableEquipment.reduce(
  (acc, equipment) => {
    if (equipment.price < 30) acc.cheap.push(equipment);
    else if (equipment.price < 100) acc.moderate.push(equipment);
    else acc.expensive.push(equipment);
    return acc;
  },
  { cheap: [], moderate: [], expensive: [] }
);

console.log("Cheap equipment:");
if (priceCategories.cheap.length === 0) console.log("No cheap eqquipment");

priceCategories.cheap.forEach((equipment) => {
  console.log(
    `Price: ${equipment.price}, name: ${equipment.name}, status: ${equipment.status}`
  );
});

console.log("Moderate equipment:");
if (priceCategories.moderate.length === 0)
  console.log("No moderate eqquipment");

priceCategories.moderate.forEach((equipment) => {
  console.log(
    `Price: ${equipment.price}, name: ${equipment.name}, status: ${equipment.status}`
  );
});

console.log("Expensive equipment:");
if (priceCategories.expensive.length === 0)
  console.log("No expensive eqquipment");

priceCategories.expensive.forEach((equipment) => {
  console.log(
    `Price: ${equipment.price}, name: ${equipment.name}, status: ${equipment.status}`
  );
});

function getStringData(promptText) {
  while (true) {
    let data = prompt(promptText);

    if (data?.trim() === "") {
      alert(`field cant be empty`);
      continue;
    }

    if (/\d/.test(data)) {
      alert("Field can t contain numbers.");
      continue;
    }

    return data;
  }
}

function getStatus(promptText) {
  while (true) {
    let data = prompt(promptText);
    if (data === "" || (data !== "dostupno" && data !== "nedostupno")) {
      alert(`${promptText} cant be empty`);
      continue;
    }

    return data;
  }
}

function getPrice() {
  while (true) {
    let price = prompt("Enter equipment price");
    let parsedPrice = parseFloat(price.replace(",", "."));

    if (parsedPrice < 0 || isNaN(parsedPrice)) {
      alert("Price cant be <= 0");
      continue;
    }

    return parsedPrice;
  }
}
