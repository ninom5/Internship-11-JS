let employes = [];
let totalSalary = 0;
let sectors = [];

do {
  let name = getStringData("name");
  if (name === null) break;

  let surname = getStringData("surname");
  if (surname === null) break;

  let salary = getSalary();
  if (salary === null) break;

  let sector = getStringData("sector");
  if (sector === null) break;

  let sec = sectors.find((s) => s.name === sector);
  if (!sec) {
    sec = { name: sector, totalSalary: 0, employes: [] };
    sectors.push(sec);
  }

  sec.employes.push({ name, surname, salary, sector });
  employes.push({ name, surname, salary, sector });

  sec.totalSalary += salary;
} while (confirm("Do you want to continue with input?"));

countAllSalary();
sectorcontributionPercentage();
printAll();

function getStringData(type) {
  let isValid = false;
  while (!isValid) {
    let data = prompt(`Enter ${type} of the worker`);
    if (data === "") {
      alert(`${type} cant be empty`);
      continue;
    }
    isValid = true;
    return data;
  }
}

function getSalary() {
  let isValid = false;
  while (!isValid) {
    let price = prompt("Enter salary of the employee");
    let parsedPrice = parseFloat(price.replace(",", "."));

    if (parsedPrice <= 0 || isNaN(parsedPrice)) {
      alert("price cant be less or equal to 0");
      continue;
    }

    isValid = true;
    return parsedPrice;
  }
}

function countAllSalary() {
  totalSalary = employes.reduce((sum, employee) => sum + employee.salary, 0);
  console.log("Total salary: ", totalSalary);
}

function sectorcontributionPercentage() {
  sectors.forEach((sector) => {
    sector.contribution = ((sector.totalSalary / totalSalary) * 100).toFixed(2);
    sector.employes.forEach((employee) => {
      employee.contributionToSector = (
        (employee.salary / sector.totalSalary) *
        100
      ).toFixed(2);
    });
  });

  sectors.sort((a, b) => b.contribution - a.contribution);
}

function printAll() {
  sectors.forEach((sector) => {
    console.log(
      "Sector: ",
      sector.name,
      "is contributing with: ",
      sector.contribution,
      " %"
    );

    sector.employes.forEach((employee) => {
      console.log(
        `Employee: ${employee.name} is contributing with: ${employee.contributionToSector} %`
      );
    });
  });
}
