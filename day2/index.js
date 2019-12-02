const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .split(",")
  .map(i => parseInt(i, 10));

input[1] = 12;
input[2] = 2;

for (let i = 0; i < input.length; i += 4) {
  switch (input[i]) {
    case 1:
      input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
      break;

    case 2:
      input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
      break;

    case 99:
      console.log(input[0]);
      process.exit(0);
      break;
  }
}
