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
  let i = 0;
  let x = 0;
  let y = 0;
  const firstWireHash = {};

  const addtoHash = (x, y) => {
    firstWireHash[`X${x}:Y${y}`] = 1;
  };

  wires[0].forEach(path => {
    let count = path.substring(1);

    switch (true) {
      case /^R/.test(path):
        for (i = 0; i < count; i++) {
          x++;
          addtoHash(x, y);
        }
        break;

      case /^L/.test(path):
        for (i = 0; i < count; i++) {
          x--;
          addtoHash(x, y);
        }
        break;

      case /^D/.test(path):
        for (i = 0; i < count; i++) {
          y--;
          addtoHash(x, y);
        }
        break;

      case /^U/.test(path):
        for (i = 0; i < count; i++) {
          y++;
          addtoHash(x, y);
        }
        break;
    }
  });

  const intersectionDistances = [];

  x = 0;
  y = 0;

  const checkIntersection = (x, y) => {
    if (1 === firstWireHash[`X${x}:Y${y}`]) {
      // console.log(`got intersection at ${x}, ${y}`);
      // console.log(`calculating distance at ${Math.abs(x) + Math.abs(y)}`);

      intersectionDistances.push(Math.abs(x) + Math.abs(y));
    }
  };

  wires[1].forEach(path => {
    let count = path.substring(1);
    // TODO: this could be cleaned up but i'm on a time crunch here so copy/paste it is!
    switch (true) {
      case /^R/.test(path):
        for (i = 0; i < count; i++) {
          x++;
          checkIntersection(x, y);
        }
        break;

      case /^L/.test(path):
        for (i = 0; i < count; i++) {
          x--;
          checkIntersection(x, y);
        }
        break;

      case /^D/.test(path):
        for (i = 0; i < count; i++) {
          y--;
          checkIntersection(x, y);
        }
        break;

      case /^U/.test(path):
        for (i = 0; i < count; i++) {
          y++;
          checkIntersection(x, y);
        }
        break;
    }
  });

  console.log(Math.min.apply(Math, intersectionDistances));
});
