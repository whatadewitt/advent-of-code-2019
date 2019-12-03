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
    let steps = 0;
    let i = 0;
    let x = 0;
    let y = 0;

    // I hate that I'm stringifying here...
    return wire.flatMap(path => {
      let count = path.substring(1);
      let resultPath = [];

      const addtoResultArray = (val, steps) => {
        resultPath.push({
          steps,
          point: JSON.stringify(val)
        });
      };

      switch (true) {
        case /^R/.test(path):
          for (i = 0; i < count; i++) {
            steps++;
            x++;
            addtoResultArray({ x, y }, steps);
          }
          break;

        case /^L/.test(path):
          for (i = 0; i < count; i++) {
            steps++;
            x--;
            addtoResultArray({ x, y }, steps);
          }
          break;

        case /^D/.test(path):
          for (i = 0; i < count; i++) {
            steps++;
            y--;
            addtoResultArray({ x, y }, steps);
          }
          break;

        case /^U/.test(path):
          for (i = 0; i < count; i++) {
            steps++;
            y++;
            addtoResultArray({ x, y }, steps);
          }
          break;
      }

      // total += count;
      return resultPath;
    });
  });

  const greenWire = result[0].map(({ point }) => point);
  const redWire = result[1].map(({ point }) => point);

  // there has to be a better way...
  const intersectionPoints = greenWire.filter(pt => redWire.includes(pt));

  const greenPoints = result[0].filter(({ point }) =>
    intersectionPoints.includes(point)
  );

  const redPoints = result[1].filter(({ point }) =>
    intersectionPoints.includes(point)
  );

  console.log(
    Math.min.apply(
      Math,
      greenPoints.map(entry => {
        const red = redPoints.find(({ point }) => point === entry.point);
        return entry.steps + red.steps;
      })
    )
  );
});
