const nameInput = document.querySelector("#name-input");
const priceInput = document.querySelector("#price-input");
const statusSelect = document.querySelector("#status-select");
const contentDiv = document.querySelector(".content");

const equipmentList = document.createElement("ul");
const proportion = document.createElement("p");

contentDiv.appendChild(equipmentList);
contentDiv.appendChild(proportion);

const equipment = [];

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameOfEquipment = nameInput.value?.trim();
  const priceOfTheEquipment = priceInput.value?.trim();
  const statusOfTheEquipment = statusSelect.value;

  if (!nameOfEquipment || !priceOfTheEquipment) {
    alert("Fill in all data");
    return;
  }

  const parsedPrice = parseFloat(priceOfTheEquipment);

  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    alert("enter only positive numbers for price");
    return;
  }

  equipment.push({
    nameOfEquipment,
    priceOfTheEquipment: parsedPrice,
    statusOfTheEquipment,
  });

  equipment.sort(
    (a, b) =>
      a.statusOfTheEquipment.localeCompare(b.statusOfTheEquipment) ||
      a.nameOfEquipment.localeCompare(b.nameOfEquipment)
  );

  updateFormAndList();
  addProportion();

  nameInput.value = "";
  priceInput.value = "";
  statusSelect.value = "";
});

function updateFormAndList() {
  equipmentList.innerHTML = "";

  equipment.forEach((equipmentItem) => {
    var equipmentListItem = document.createElement("li");
    equipmentListItem.textContent = `Name: ${equipmentItem.nameOfEquipment}, price: ${equipmentItem.priceOfTheEquipment}, status: ${equipmentItem.statusOfTheEquipment}`;

    equipmentListItem.style.color =
      equipmentItem.statusOfTheEquipment === "dostupno" ? "green" : "red";

    equipmentList.appendChild(equipmentListItem);
  });
}

function addProportion() {
  let numberOfAvailable = equipment.filter(
    (item) => item.statusOfTheEquipment === "dostupno"
  ).length;
  let numberOfUnavailable = equipment.length - numberOfAvailable;

  proportion.textContent = `Proportion of available and unavailable items: \n ${numberOfAvailable} / ${numberOfUnavailable} with percentage of: ${(
    (numberOfAvailable / equipment.length) *
    100
  ).toFixed(2)}`;
}
