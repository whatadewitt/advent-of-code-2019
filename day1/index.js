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
    return acc + (Math.floor(curr / 3) - 2);
  }, 0);

  console.log(result);
});
