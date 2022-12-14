import { pouringPoint, Unit } from './main';


export const addRocks = (rocks: Unit[], prev: Unit, current: Unit) => {
  if (prev.x === current.x) {
    const dist = Math.abs(current.y - prev.y);
    if (current.y > prev.y) {
      [...Array(dist)].forEach((_, i) => {
        rocks.push({ x: prev.x, y: prev.y + i + 1, char: '#' });
      });
    } else {
      [...Array(dist)].forEach((_, i) => {
        rocks.push({ x: prev.x, y: prev.y - i - 1, char: '#' });
      });
    }
  } else {
    const dist = Math.abs(current.x - prev.x);
    if (current.x > prev.x) {
      [...Array(dist)].forEach((_, i) => {
        rocks.push({ x: prev.x + i + 1, y: prev.y, char: '#' });
      });
    } else {
      [...Array(dist)].forEach((_, i) => {
        rocks.push({ x: prev.x - i - 1, y: prev.y, char: '#' });
      });
    }
  }
};

export const makeGrid = (rocks: Unit[]): String[][] => {
  //kinda hacky and slow but works :D
  const minX = rocks.reduce((a: number, b: Unit) => Math.min(a, b.x), pouringPoint.x) - 1000;
  const maxX = rocks.reduce((a: number, b: Unit) => Math.max(a, b.x), pouringPoint.x) + 1000;
  const minY = pouringPoint.y;
  const maxY = rocks.reduce((a: number, b: Unit) => Math.max(a, b.y), pouringPoint.y) + 1;
  const grid: String[][] = [];
  for (let y = minY; y <= maxY; y++) {
    grid.push([]);
    for (let x = minX; x <= maxX; x++) {
      if (x === pouringPoint.x && y === pouringPoint.y) {
        grid[y].push(pouringPoint.char);
        continue;
      }
      const rock = rocks.find(r => r.x === x && y === r.y);
      if (rock) {
        grid[y].push(rock.char);
        continue;
      }
      grid[y].push('.');
    }
  }
  grid.push([]);

  for (let x = minX; x <= maxX; x++) {
    grid[grid.length - 1].push('#');
  }

  return grid;
};

export const printGrid = (grid: String[][]) => {
  grid.forEach(row => console.log(row.join(' ')));
};