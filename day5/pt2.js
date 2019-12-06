const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .split(",")
  .map(i => parseInt(i, 10));

const parseOpcode = code => {
  return {
    op: code % 100,
    param1Mode: Math.floor((code % 1000) / 100),
    param2Mode: Math.floor((code % 10000) / 1000),
    param3Mode: Math.floor(code / 10000)
  };
};

let i = 0;
let opcode = parseOpcode(input[i]);

while (opcode.op !== 99) {
  const param1 = opcode.param1Mode === 0 ? input[i + 1] : i + 1;
  const param2 = opcode.param2Mode === 0 ? input[i + 2] : i + 2;
  const param3 = opcode.param3Mode === 0 ? input[i + 3] : i + 3;

  switch (opcode.op) {
    case 1:
    case 2:
      if (opcode.op === 1) {
        input[param3] = input[param1] + input[param2];
      } else if (opcode.op === 2) {
        input[param3] = input[param1] * input[param2];
      }

      i += 4;
      break;

    case 3:
    case 4:
      let outputParam = input[i + 1];
      // console.log(outputParam);

      if (opcode.op === 3) {
        input[outputParam] = 5;
      } else if (opcode.op === 4) {
        console.log(input[outputParam]);
      }

      i += 2;
      break;

    case 5:
      if (input[param1] !== 0) {
        i = input[param2];
      } else {
        i += 3;
      }

      break;

    case 6:
      if (input[param1] === 0) {
        i = input[param2];
      } else {
        i += 3;
      }

      break;

    case 7:
      input[param3] = input[param1] < input[param2] ? 1 : 0;

      i += 4;
      break;

    case 8:
      input[param3] = input[param1] === input[param2] ? 1 : 0;

      i += 4;
      break;

    case 99:
      console.log(input[0]);
      process.exit(0);
      break;
  }

  opcode = parseOpcode(input[i]);
}
