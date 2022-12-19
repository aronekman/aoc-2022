export const comeToRest = (layers: string[][], u: number, d: number) => {
  for (let y = d; y <= u; y++) {
    layers[y] = layers[y].map((c) => (c === '@' ? '#' : c));
  }
  while (!layers[layers.length - 1].includes('#')) {
    layers.pop();
  }
};
export const moveOneDown = (layers: string[][], u: number, d: number) => {
  if (d === 0) {
    comeToRest(layers, u, d);
    return false;
  }
  for (let y = d; y <= u; y++) {
    if (
      !layers[y].every((c, x) => {
        if (c !== '@') return true;
        if (layers[y - 1][x] === '#') {
          return false;
        }
        return true;
      })
    ) {
      comeToRest(layers, u, d);
      return false;
    }
  }
  for (let y = d; y <= u; y++) {
    for (let x = 0; x < 7; x++) {
      if (layers[y][x] === '@') {
        layers[y - 1][x] = '@';
        layers[y][x] = '.';
      }
    }
  }

  return true;
};

export const moveOneRight = (layers: string[][], u: number, d: number): boolean => {
  for (let y = d; y <= u; y++) {
    for (let x = 0; x < 6; x++) {
      if (layers[y][x] === '@' && layers[y][x + 1] === '#') {
        return false;
      }
    }
  }
  for (let y = d; y <= u; y++) {
    for (let x = 6; x > 0; x--) {
      if (layers[y][x - 1] === '@') {
        layers[y][x] = '@';
        layers[y][x - 1] = '.';
      }
    }
  }
  return true;
};

export const moveOneLeft = (layers: string[][], u: number, d: number): boolean => {
  for (let y = d; y <= u; y++) {
    for (let x = 6; x > 0; x--) {
      if (layers[y][x] === '@' && layers[y][x - 1] === '#') {
        return false;
      }
    }
  }
  for (let y = d; y <= u; y++) {
    for (let x = 0; x < 6; x++) {
      if (layers[y][x + 1] === '@') {
        layers[y][x] = '@';
        layers[y][x + 1] = '.';
      }
    }
  }
  return true;
};

export const prettyPrint = (layers: string[][]) => {
  [...layers].reverse().forEach((row) => {
    console.log(`|${row.join('')}|`);
  });
  console.log(`+${[...Array(7)].map((_) => '-').join('')}+`);
  console.log();
};

export const isRepeating = (layers: string[][]) => {
  //if (layers.length % 2 !== 0) return false;
  let i1 = 0;
  let i2 = layers.length / 2;
  while (i2 < layers.length) {
    if (JSON.stringify(layers[i1]) !== JSON.stringify(layers[i2])) return false;
    i1++;
    i2++;
  }

  return true;
};
