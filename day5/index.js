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
  let output,
    input1,
    input2 = -1;

  switch (opcode.op) {
    case 1:
    case 2:
      output = opcode.param3Mode === 0 ? input[i + 3] : i + 3;

      input1 = opcode.param1Mode === 0 ? input[i + 1] : i + 1;
      input2 = opcode.param2Mode === 0 ? input[i + 2] : i + 2;

      if (opcode.op === 1) {
        input[output] = input[input1] + input[input2];
      } else if (opcode.op === 2) {
        input[output] = input[input1] * input[input2];
      }

      i += 4;
      break;

    case 3:
    case 4:
      output = opcode.param1Mode === 0 ? input[i + 1] : i + 1;

      if (opcode.op === 3) {
        input[output] = 1;
      } else if (opcode.op === 4) {
        console.log(input[output]);
      }

      i += 2;
      break;

    case 99:
      console.log(input[0]);
      process.exit(0);
      break;
  }

  opcode = parseOpcode(input[i]);
}
