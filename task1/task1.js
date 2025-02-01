let booksData = [];
let averagePrice = 0.0;
let maxDiff = 0;
let maxDiffBook;

do {
  let name = getStringData("name");
  if (name === null) break;

  let price = getPrice();
  if (price === null) break;

  let genre = getStringData("genre");
  if (genre === null) break;

  booksData.push({ name, price, genre });
} while (confirm("Do you want to continue with input?"));

if (booksData.length > 1) {
  getAveragePrice();
  mostDifferenceFromAvg();

  const sortedBooks = booksData.sort((a, b) => b.difference - a.difference);
  console.log(
    "Books sorted by difference from the biggest to lowest: ",
    sortedBooks
  );
} else console.log("Not enough data to process(at least 2 books needed");

console.log("all books inserted: ", booksData);

function getStringData(type) {
  let isValid = false;
  while (!isValid) {
    let data = prompt(`Enter ${type} of the book`);
    if (data === "") {
      alert(`${type} cant be empty`);
      continue;
    }
    isValid = true;
    return data;
  }
}

function getPrice() {
  let isValid = false;
  while (!isValid) {
    let price = prompt("Enter price of the book");
    let parsedPrice = parseFloat(price.replace(",", "."));

    console.log(parsedPrice);

    if (parsedPrice <= 0 || isNaN(parsedPrice)) {
      alert("price cant be less or equal to 0");
      continue;
    }

    isValid = true;
    return parsedPrice;
  }
}

function getAveragePrice() {
  averagePrice =
    booksData.reduce((sum, book) => sum + book.price, 0) / booksData.length;
  console.log("Avg price: ", averagePrice);
}

function mostDifferenceFromAvg() {
  booksData.forEach((book) => {
    let bookPrice = book.price;
    let currDif = Math.abs(averagePrice - bookPrice);

    book.difference = currDif;

    if (currDif > maxDiff) {
      maxDiff = currDif;
      maxDiffBook = book;
    }
  });

  console.log(
    "Book with the greatest difference from avg price: ",
    maxDiffBook.name,
    "with price: ",
    maxDiffBook.price,
    "and difference: ",
    maxDiffBook.difference
  );
}
