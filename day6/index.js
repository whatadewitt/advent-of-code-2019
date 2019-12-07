const readline = require("readline");
const fs = require("fs");

const read = readline.createInterface({
  input: fs.createReadStream("./input.txt")
});

const orbits = {};

read.on("line", line => {
  const [orbiter, orbitee] = line.split(")");

  if (!orbits[orbitee]) {
    orbits[orbitee] = [];
  }

  orbits[orbitee] = orbiter;
});

read.on("close", () => {
  let count = 0;

  const calculateOrbits = o => {
    if (orbits[o]) {
      return 1 + calculateOrbits(orbits[o]);
    } else {
      return 1;
    }
  };

  Object.keys(orbits).forEach(o => {
    count += calculateOrbits(orbits[o]);
  });

  console.log(count);
});
