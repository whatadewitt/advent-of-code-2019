const fs = require("fs");

const data = fs
  .readFileSync("./input.txt")
  .toString()
  .split(",")
  .map(i => parseInt(i, 10));

nounloop: for (let noun = 0; noun < 100; noun++) {
  verbloop: for (let verb = 0; verb < 100; verb++) {
    const input = [...data];
    input[1] = noun;
    input[2] = verb;

    inputloop: for (let i = 0; i < input.length; i += 4) {
      switch (input[i]) {
        case 1:
          input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
          break;

        case 2:
          input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
          break;

        case 99:
          if (19690720 === input[0]) {
            console.log(`noun: ${noun}, verb: ${verb}`);
            process.exit(0);
          }

          break inputloop;
          break;
      }
    }
  }
}
