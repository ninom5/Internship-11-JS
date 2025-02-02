let employes = [];
let industries = [];
let salaryIndustry = [];
let industriesWithMinTwoEmployees = [];

do {
  let name = getStringData("Enter name of worker");
  if (name === null) break;

  let surname = getStringData("Enter surname of worker");
  if (surname === null) break;

  let salary = getSalary();
  if (salary === null) break;

  let industry = getStringData("Enter industry");
  if (industry === null) break;

  if (!industries.includes(industry)) industries.push(industry);

  employes.push({ name, surname, salary, industry });
} while (confirm("Do you want to continue with input?"));

averageSalaryByIndustry();

industriesWithMinTwoEmployees.length > 0
  ? console.log(
      "Industries with at least 2 employees: ",
      industriesWithMinTwoEmployees
    )
  : console.log("There is no industries with at least 2 employees");

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

function averageSalaryByIndustry() {
  industries.forEach((industry) => {
    let sumOfSalary = 0;
    let employeeCount = 0;
    employes.forEach((employee) => {
      if (employee.industry === industry) {
        sumOfSalary += employee.salary;
        employeeCount++;
      }
    });

    if (
      employeeCount >= 2 &&
      !industriesWithMinTwoEmployees.includes(industry)
    ) {
      industriesWithMinTwoEmployees.push(industry);
    }

    let avgSalary = employeeCount > 0 ? sumOfSalary / employeeCount : 0;
    salaryIndustry.push({ industry, avgSalary });

    console.log(
      "Average salary in industry: ",
      industry,
      "is: ",
      avgSalary.toFixed(2),
      "with number of employes: ",
      employeeCount
    );
  });
}
