const INPUT_START = 273025;
const INPUT_END = 767253;

let count = 0;
let i = 0;

for (i = INPUT_START; i < INPUT_END; i++) {
  const val = i
    .toString()
    .split("")
    .map(n => parseInt(n, 10));

  const sorted = [...val].sort();
  if (i == parseInt(sorted.join(""), 10)) {
    // we need to ensure there's a group of EXACTLY two matched chars...
    const reduced = sorted.reduce((obj, curr) => {
      if (!obj[curr]) {
        obj[curr] = 0;
      }

      obj[curr] = obj[curr] + 1;
      return obj;
    }, {});

    // why can't i do this for real?
    if (Object.values(reduced).find(i => i === 2)) {
      count++;
    }
  }
}

console.log(count);
