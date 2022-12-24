import { readFileSync } from 'fs';

interface Cordinate {
  x: number;
  y: number;
}
interface Elf {
  pos: Cordinate;
  next?: Cordinate;
  directions: string[];
}

// if true use test_input.txt else input.txt
const test = false;

const main = () => {
  const input = readFileSync(`day23/${test ? 'test_input' : 'input'}.txt`, 'utf-8');
  const elves: Elf[] = [];
  input.split('\n').forEach((row, y) =>
    row.split('').forEach((element, x) => {
      if (element !== '#') return;
      elves.push({ pos: { x, y }, directions: ['N', 'S', 'W', 'E'] });
    })
  );
  console.log('Part 2:', part2(elves));
};

const part2 = (elves: Elf[]): number => {
  let count = 0;
  while (true) {
    elves.forEach((elf, i) => {
      if (checkAdjacent(elf, elves)) {
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (elf.directions[i] === 'N' && checkNorth(elf, elves)) {
          elf.next = { x: elf.pos.x, y: elf.pos.y - 1 };
          break;
        }
        if (elf.directions[i] === 'S' && checkSouth(elf, elves)) {
          elf.next = { x: elf.pos.x, y: elf.pos.y + 1 };
          break;
        }
        if (elf.directions[i] === 'W' && checkWest(elf, elves)) {
          elf.next = { x: elf.pos.x - 1, y: elf.pos.y };
          break;
        }
        if (elf.directions[i] === 'E' && checkEast(elf, elves)) {
          elf.next = { x: elf.pos.x + 1, y: elf.pos.y };
          break;
        }
      }
    });
    elves.forEach((elf, i) => {
      if (!elf.next) return;
      elves.forEach((e, j) => {
        if (!e.next || (e.pos.x === elf.pos.x && e.pos.y === elf.pos.y)) return;
        if (e.next.x === elf.next.x && e.next.y === elf.next.y) {
          elves[j] = { pos: e.pos, directions: e.directions };
          elves[i] = { pos: elf.pos, directions: elf.directions };
        }
      });
    });
    let moves = false;
    elves.forEach((elf, i) => {
      if (elf.next) {
        moves = true;
        elves[i] = { pos: elf.next, directions: elf.directions };
      }
      elf.directions.push(elf.directions.splice(0, 1)[0]);
    });
    count++;
    if (!moves) {
      //printElves(elves);
      return count;
    }
    if (count % 100 === 0) console.log(count);
  }
};

const checkAdjacent = (elf: Elf, elves: Elf[]): boolean => {
  return elves.every(({ pos }) => {
    if (pos.x === elf.pos.x && pos.y === elf.pos.y) return true;
    return Math.abs(elf.pos.x - pos.x) > 1 || Math.abs(elf.pos.y - pos.y) > 1;
  });
};

const checkNorth = (elf: Elf, elves: Elf[]): boolean => {
  return elves.every(({ pos }) => {
    if (elf.pos.y - pos.y !== 1) return true;
    return pos.x !== elf.pos.x && Math.abs(pos.x - elf.pos.x) !== 1;
  });
};
const checkSouth = (elf: Elf, elves: Elf[]): boolean => {
  return elves.every(({ pos }) => {
    if (pos.y - elf.pos.y !== 1) return true;
    return pos.x !== elf.pos.x && Math.abs(pos.x - elf.pos.x) !== 1;
  });
};

const checkWest = (elf: Elf, elves: Elf[]): boolean => {
  return elves.every(({ pos }) => {
    if (elf.pos.x - pos.x !== 1) return true;
    return pos.y !== elf.pos.y && Math.abs(pos.y - elf.pos.y) !== 1;
  });
};
const checkEast = (elf: Elf, elves: Elf[]): boolean => {
  return elves.every(({ pos }) => {
    if (pos.x - elf.pos.x !== 1) return true;
    return pos.y !== elf.pos.y && Math.abs(pos.y - elf.pos.y) !== 1;
  });
};

const countEmpty = (elves: Elf[]) => {
  const minY = elves.reduce((a: number, b: Elf) => Math.min(a, b.pos.y), 0);
  const minX = elves.reduce((a: number, b: Elf) => Math.min(a, b.pos.x), 0);
  const maxY = elves.reduce((a: number, b: Elf) => Math.max(a, b.pos.y), 0);
  const maxX = elves.reduce((a: number, b: Elf) => Math.max(a, b.pos.x), 0);
  return (maxX - minX + 1) * (maxY - minY + 1) - elves.length;
};
const printElves = (elves: Elf[]) => {
  const minY = elves.reduce((a: number, b: Elf) => Math.min(a, b.pos.y), 0);
  const minX = elves.reduce((a: number, b: Elf) => Math.min(a, b.pos.x), 0);
  const maxY = elves.reduce((a: number, b: Elf) => Math.max(a, b.pos.y), 0);
  const maxX = elves.reduce((a: number, b: Elf) => Math.max(a, b.pos.x), 0);
  for (let y = minY; y < maxY + 1; y++) {
    for (let x = minX; x < maxX + 1; x++) {
      const elf = elves.find((e) => e.pos.x === x && e.pos.y === y);
      if (elf) {
        process.stdout.write(elf.next ? '^' : '#');
      } else {
        process.stdout.write('.');
      }
    }
    process.stdout.write('\n');
  }
  console.log();
};

main();
