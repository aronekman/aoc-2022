import { readFileSync } from 'fs';
import { addRocks, makeGrid, printGrid } from './utils';

export interface Unit {
  x: number,
  y: number
  char: string
}

export const pouringPoint: Unit = { x: 500, y: 0, char: '+' };

const main = () => {
  const input = readFileSync('day14/input.txt', 'utf-8');


  const rocks: Unit[] = [];
  input.split('\n').forEach((line) => {
    let prev: Unit | null = null;
    line.split(' -> ').forEach((rock) => {
      const [x, y] = rock.split(',').map(Number);
      const current = { x, y, char: '#' };
      if (!prev) {
        prev = current;
        rocks.push(prev);
        return;
      }
      addRocks(rocks, prev, current);
      prev = current;
    });
  });
  const grid: String[][] = makeGrid(rocks);
  printGrid(grid);
  console.log(simulate(grid));
};

const simulate = (grid: String[][]) => {
  const startXCord = grid[0].indexOf(pouringPoint.char);
  let count = 0;
  let running = true;
  while (running) {
    let canMove = true;
    let sand: Unit = { x: startXCord, y: 0, char: 'O' };
    while (canMove) {
      grid[sand.y][sand.x] = 'O';
      if (sand.y + 1 >= grid.length) {
        canMove = false;
        continue;
      }
      if (grid[sand.y + 1][sand.x] === '.') {
        grid[sand.y][sand.x] = '.';
        sand.y += 1;
        continue;
      }
      if (grid[sand.y + 1][sand.x] === '#' || grid[sand.y + 1][sand.x] === 'O') {
        if (grid[sand.y + 1][sand.x - 1] === '.') {
          grid[sand.y][sand.x] = '.';
          sand.y += 1;
          sand.x -= 1;
          continue;
        }
        if (grid[sand.y + 1][sand.x + 1] === '.') {
          grid[sand.y][sand.x] = '.';
          sand.y += 1;
          sand.x += 1;
          continue;
        }
      }

      if (sand.x === startXCord && sand.y === 0) {
        running = false;
      }

      canMove = false;

    }
    count++;
  }
  return count;
};


main();