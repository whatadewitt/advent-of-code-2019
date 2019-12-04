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
  let steps = 0;
  let i = 0;
  let x = 0;
  let y = 0;
  const firstWireHash = {};

  const addtoHash = (x, y, steps) => {
    firstWireHash[`X${x}:Y${y}`] = steps;
  };

  wires[0].forEach(path => {
    let count = path.substring(1);

    switch (true) {
      case /^R/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          x++;
          addtoHash(x, y, steps);
        }
        break;

      case /^L/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          x--;
          addtoHash(x, y, steps);
        }
        break;

      case /^D/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          y--;
          addtoHash(x, y, steps);
        }
        break;

      case /^U/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          y++;
          addtoHash(x, y, steps);
        }
        break;
    }
  });

  const intersectionSteps = [];

  x = 0;
  y = 0;
  steps = 0;

  const checkIntersection = (x, y, steps) => {
    if (firstWireHash[`X${x}:Y${y}`]) {
      // console.log(`got intersection at ${x}, ${y}`);
      // console.log(steps, firstWireHash[`X${x}:Y${y}`]);
      // console.log(
      //   `calculated distance at ${firstWireHash[`X${x}:Y${y}`] + steps}`
      // );

      intersectionSteps.push(firstWireHash[`X${x}:Y${y}`] + steps);
    }
  };

  wires[1].forEach(path => {
    let count = path.substring(1);
    // TODO: this could be cleaned up but i'm on a time crunch here so copy/paste it is!
    switch (true) {
      case /^R/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          x++;
          checkIntersection(x, y, steps);
        }
        break;

      case /^L/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          x--;
          checkIntersection(x, y, steps);
        }
        break;

      case /^D/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          y--;
          checkIntersection(x, y, steps);
        }
        break;

      case /^U/.test(path):
        for (i = 0; i < count; i++) {
          steps++;
          y++;
          checkIntersection(x, y, steps);
        }
        break;
    }
  });

  console.log(Math.min.apply(Math, intersectionSteps));
});
