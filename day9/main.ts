import { readFileSync } from 'fs';

interface Command {
  direction: string;
  amount: number;
}

interface Cordinate {
  x: number;
  y: number;
}

const main = (): number => {
  const input = readFileSync('day9/input.txt', 'utf-8');
  const commands: Command[] = input.split('\n').map((line) => {
    const [d, a] = line.split(' ');
    return { direction: d, amount: Number(a) };
  });
  let head: Cordinate = { x: 0, y: 0 };
  let tails: Cordinate[] = [...Array(9)].map((_) => {
    return { x: 0, y: 0 };
  });
  //onsole.log(commands.reduce((x, y) => x + y.amount, 0));
  let visitedPlaces: Cordinate[] = [];
  commands.forEach(({ direction, amount }) => {
    [...Array(amount)].forEach((_) => {
      switch (direction) {
        case 'R': {
          head.x += 1;

          break;
        }
        case 'L': {
          head.x -= 1;
          break;
        }
        case 'U': {
          head.y += 1;
          break;
        }
        case 'D': {
          head.y -= 1;
          break;
        }
      }
      tails = moveTails(head, tails);
      /* console.log(
        tails.map((t, i) => {
          return { i: i + 1, ...t };
        })
      ); */
      if (!visitedPlaces.some(({ x, y }) => x === tails[8].x && y === tails[8].y)) {
        visitedPlaces.push({ ...tails[8] });
      }
    });
  });
  return visitedPlaces.length;
};

const moveTails = (head: Cordinate, tail: Cordinate[]): Cordinate[] => {
  for (let i = 0; i < 9; i++) {
    if (i === 0) {
      tail[i] = CalculateNewPos(head, tail[i]);
    } else {
      tail[i] = CalculateNewPos(tail[i - 1], tail[i]);
    }
  }
  return tail;
};

const CalculateNewPos = (prev: Cordinate, knot: Cordinate): Cordinate => {
  if (Math.abs(prev.x - knot.x) > 1 && Math.abs(prev.y - knot.y) > 1) {
    const x = prev.x > knot.x ? prev.x - 1 : prev.x + 1;
    const y = prev.y > knot.y ? prev.y - 1 : prev.y + 1;
    return { x, y };
  }
  if (prev.x - knot.x > 1) return { x: prev.x - 1, y: prev.y };
  if (knot.x - prev.x > 1) return { x: prev.x + 1, y: prev.y };
  if (prev.y - knot.y > 1) return { x: prev.x, y: prev.y - 1 };
  if (knot.y - prev.y > 1) return { x: prev.x, y: prev.y + 1 };
  return knot;
};

console.log({ part2: main() });
