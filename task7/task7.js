let arrayOfSquared = [];

const numberOfElements = getNumberOfElements();

let sumOfSquares = recursiveSquares(numberOfElements);

let median = getMedian(sumOfSquares);

console.log(
  `Sum of first ${numberOfElements} squared numbers: ${sumOfSquares}, avg value: ${
    sumOfSquares / numberOfElements
  }, median: ${median}`
);

function recursiveSquares(n) {
  if (n === 1) {
    arrayOfSquared.push(1);
    return 1;
  }

  let squaredNumber = n ** 2;
  arrayOfSquared.push(squaredNumber);

  return squaredNumber + recursiveSquares(n - 1);
}

function getMedian() {
  let sortedSquaredNumbers = [...arrayOfSquared].sort((a, b) => a - b);

  if (numberOfElements % 2 === 0) {
    let middleValueNumber = sortedSquaredNumbers[numberOfElements / 2 - 1];
    let middleValueNumber2 = sortedSquaredNumbers[numberOfElements / 2];

    return (middleValueNumber + middleValueNumber2) / 2;
  }

  return sortedSquaredNumbers[Math.floor(numberOfElements / 2)];
}

function getNumberOfElements() {
  while (true) {
    let numberOfElements = prompt(
      "Enter the number of the first n natural numbers:"
    );

    let parsedNumber = parseInt(numberOfElements, 10);

    if (
      isNaN(parsedNumber) ||
      parsedNumber <= 0 ||
      !Number.isInteger(parsedNumber)
    ) {
      alert("Invalid input! Please enter a positive whole number.");
      continue;
    }

    return parsedNumber;
  }
}
