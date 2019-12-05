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
    const set = new Set(sorted);

    if (set.size < val.length) {
      count++;
    }
  }
}

console.log(count);
