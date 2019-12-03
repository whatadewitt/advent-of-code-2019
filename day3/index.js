const readline = require("readline");
const fs = require("fs");

const read = readline.createInterface({
  input: fs.createReadStream("./input.txt")
});

const wires = [];

read.on("line", line => {
  wires.push(line.split(","));
});

read.on("close", () => {
  const result = wires.map(wire => {
    let i = 0;
    let x = 0;
    let y = 0;

    // I hate that I'm stringifying here...
    return wire.flatMap(path => {
      let count = path.substring(1);
      let resultPath = [];

      const addtoResultArray = val => {
        resultPath.push(JSON.stringify(val));
      };

      switch (true) {
        case /^R/.test(path):
          for (i = 0; i < count; i++) {
            x++;
            addtoResultArray({ x, y });
          }
          break;

        case /^L/.test(path):
          for (i = 0; i < count; i++) {
            x--;
            addtoResultArray({ x, y });
          }
          break;

        case /^D/.test(path):
          for (i = 0; i < count; i++) {
            y--;
            addtoResultArray({ x, y });
          }
          break;

        case /^U/.test(path):
          for (i = 0; i < count; i++) {
            y++;
            addtoResultArray({ x, y });
          }
          break;
      }

      return resultPath;
    });
  });

  // there has to be a better way...
  const intersectionPoints = result[0]
    .filter(pt => result[1].includes(pt))
    .map(pt => JSON.parse(pt))
    .map(({ x, y }) => Math.abs(x) + Math.abs(y));

  console.log(Math.min.apply(Math, intersectionPoints));
});
