let students = [];
let categories = ["0-25", "25-50", "50-75", "75-100"];

do {
  let name = getStringData("Enter name of the student");
  if (name === null) break;

  let surname = getStringData("Enter surname of the student");
  if (surname === null) break;

  let points = getPoints();
  if (points === null) break;

  let category = getCategory(points);

  students.push({ name, surname, points, category });
} while (confirm("Do you want to continue with input?"));

categories.forEach((category) => {
  printSortedStudentsByCategory(category);
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

function getPoints() {
  let isValid = false;
  while (!isValid) {
    let points = prompt("Enter percentage of the student");
    let parsedPoints = parseFloat(points.replace(",", "."));

    if (parsedPoints < 0 || parsedPoints > 100 || isNaN(parsedPoints)) {
      alert("Percentage can t be < 0 and > 100");
      continue;
    }

    isValid = true;
    return parsedPoints;
  }
}

function getCategory(points) {
  const index = Math.min(Math.floor(points / 25), categories.length - 1);
  return categories[index];
}

function printSortedStudentsByCategory(category) {
  let filteredStudents = students.filter(
    (student) => category === student.category
  );

  filteredStudents.sort((a, b) => a.surname.localeCompare(b.surname));

  console.log("");
  console.log("Students from category: ", category, "(fromat: surname, name");
  filteredStudents.forEach((student, index) => {
    console.log(`${index + 1}. ${student.surname + " " + student.name}`);
  });

  let avgPoints =
    filteredStudents.reduce((sum, student) => sum + student.points, 0) /
    filteredStudents.length;

  console.log("Avg points in this category: ", avgPoints);
}
