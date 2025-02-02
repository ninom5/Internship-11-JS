const saveButton = document.querySelector(".button-save-data");

let cities = [];

do {
  let name = getStringData("Enter name of the city");
  if (name === null) break;

  cities.push({ name });
} while (confirm("Do you want to continue with input?"));

cities.sort((a, b) => a.name.localeCompare(b.name));

console.log("Sorted cities by name: ");
cities.forEach((city) => console.log("City: ", city.name));

cities = cities.filter((city) => city.name.length > 5);

console.log("Filtered cities by length: ");
cities.forEach((city) => console.log("City: ", city.name));

const csvCities = cities.map((city) => city.name).join(", ");
console.log("Cities in csv format: ", csvCities);

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

saveButton.addEventListener("click", () => {
  if (csvCities.length === 0) {
    alert("No data to download");
    return;
  }
  const blob = new Blob([csvCities], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cities.txt";
  link.click();
});
