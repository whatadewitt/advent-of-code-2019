const readline = require("readline");
const fs = require("fs");

const read = readline.createInterface({
  input: fs.createReadStream("./input.txt")
});

const inputs = [];

read.on("line", line => {
  inputs.push(parseInt(line, 10));
});

read.on("close", () => {
  const result = inputs.reduce((acc, curr) => {
    let fuelTotal = 0;
    let fuel = Math.floor(curr / 3) - 2;

    while (fuel > 0) {
      fuelTotal += fuel;
      fuel = Math.floor(fuel / 3) - 2;
    }

    return acc + fuelTotal;
  }, 0);

  console.log(result);
});
