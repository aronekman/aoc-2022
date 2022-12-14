import { readFileSync } from 'fs';
import { dijkstra, isNeighour, minDistance, Square } from './utils';

const main = () => {
  const input = readFileSync('day12/input.txt', 'utf-8');
  let start: Square;
  let end: Square;
  const grid: Square[][] = input.split('\n').map((line, y) =>
    line.split('').map((height, x) => {
      const s: Square = { x, y, height: height.charCodeAt(0) - 96 };
      if (height === 'S') {
        s.height = 1;
        start = s;
      }
      if (height === 'E') {
        s.height = 'z'.charCodeAt(0) - 96;
        end = s;
      }
      return s;
    })
  );

  let min: number = dijkstra(grid, start, end);

  console.log('Part1:', min);
  let amount = 0;

  grid.forEach((row) =>
    row.forEach((s) => {
      if (s.height !== 1) return;
      amount++;
      //min = Math.min(min, dijkstra(grid, s, end));
    })
  );
  let count = 0;
  grid.forEach((row) =>
    row.forEach((s) => {
      if (s.height !== 1) return;
      count++;
      min = Math.min(min, dijkstra(grid, s, end));
      console.log(`progress: ${count}/${amount}`);
    })
  );
  console.log('part2:', min);
};

main();
