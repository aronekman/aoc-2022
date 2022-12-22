import { readFileSync } from 'fs';

const test = false;

type Path = number | string;

const main = () => {
  const input = readFileSync(`day22/${test ? 'test_input' : 'input'}.txt`, 'utf-8').split('\n');
  const path: Path[] = input
    .pop()
    .match(/\d+|R|L/g)
    .map((c) => (isNaN(Number(c)) ? c : Number(c)));
  input.pop();
  const map: string[][] = input.map((row) => row.split(''));
  const p1 = part1(map, path);
  console.log('part 1:', p1);
};

const part1 = (map: string[][], path: Path[]): number => {
  let x = map[0].findIndex((c) => c === '.');
  let y = 0;
  let dir: [number, number] = [1, 0];
  path.forEach((p: string | number, i) => {
    if (typeof p === 'string') {
      dir = turn(dir, p);
      return;
    }
    for (let i = 0; i < p; i++) {
      if (
        y + dir[1] >= map.length ||
        x + dir[0] >= map[y].length ||
        y + dir[1] < 0 ||
        x + dir[0] < 0 ||
        !map[y + dir[1]][x + dir[0]] ||
        map[y + dir[1]][x + dir[0]] === ' '
      ) {
        const startPos = [x, y];
        if (dir[0] === 1) {
          while (x > 0 && map[y][x - 1] !== ' ') x--;
        }
        if (dir[0] === -1) {
          while (x < map[y].length - 1 && map[y][x + 1] && map[y][x + 1] !== ' ') x++;
        }
        if (dir[1] === 1) {
          while (y > 0 && map[y - 1][x] !== ' ') y--;
        }
        if (dir[1] === -1) {
          while (y < map.length - 1 && map[y + 1][x] && map[y + 1][x] !== ' ') y++;
        }
        if (map[y][x] === '#') {
          x = startPos[0];
          y = startPos[1];
          break;
        }
        continue;
      }
      if (map[y + dir[1]][x + dir[0]] === '#') break;
      x += dir[0];
      y += dir[1];
    }
  });
  const password = (dir: number): number => 1000 * (y + 1) + 4 * (x + 1) + dir;
  if (dir[0] === 1 && dir[1] === 0) return password(0);
  if (dir[0] === 0 && dir[1] === 1) return password(1);
  if (dir[0] === -1 && dir[1] === 0) return password(2);
  if (dir[0] === 0 && dir[1] === -1) return password(3);
};

const turn = (currentDir: [number, number], dir: string): [number, number] => {
  return dir === 'R'
    ? [currentDir[0] !== 0 ? 0 : -currentDir[1], currentDir[1] !== 0 ? 0 : currentDir[0]]
    : [currentDir[0] !== 0 ? 0 : currentDir[1], currentDir[1] !== 0 ? 0 : -currentDir[0]];
};

const printMap = (map: string[][], x: number, y: number) => {
  map.forEach((row, j) => {
    row.forEach((c, i) => {
      process.stdout.write(i === x && j === y ? '\x1b[91m@\x1b[39m' : c);
    });
    process.stdout.write('\n');
  });
  process.stdout.write('\n');
};

main();
