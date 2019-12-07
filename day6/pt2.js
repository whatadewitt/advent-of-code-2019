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
  const buildTrail = key => {
    if (orbits[key]) {
      return [...buildTrail(orbits[key]), key];
    } else {
      return [key];
    }
  };

  const trailYou = buildTrail(orbits.YOU).reverse();
  const trailSan = buildTrail(orbits.SAN).reverse();

  let i, j;
  for (i = 0; i < trailYou.length; i++) {
    for (j = 0; j < trailSan.length; j++) {
      if (trailYou[i] === trailSan[j]) {
        console.log(i + j);
        process.exit(0);
      }
    }
  }
});
