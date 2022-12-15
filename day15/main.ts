import { readFileSync } from 'fs';


interface Sensor {
  x: number;
  y: number;
  radius: number;
}

const main = () => {
  const input = readFileSync('day15/input.txt', 'utf-8');
  const sensors: Sensor[] = input.split('\n').map(line => {
    const [sx, sy, bx, by] = line.match(/-*\d+/g).map(Number);
    return {
      x: sx,
      y: sy,
      radius: Math.abs(sx - bx) + Math.abs(sy - by)
    };
  });
  console.log('starting part 1...');
  const p1 = part1(sensors, 10);
  console.log('Part 1 finished');
  console.log('starting part 2...');

  const p2 = part2(sensors, 0, 40000);

  console.log('Part 2 finished');
  console.log('part1:', p1);
  console.log('part2', p2);
};

const part1 = (sensors: Sensor[], row: number) => {
  const res: Set<number> = new Set<number>([]);
  sensors.forEach((s: Sensor) => {
    const dy = Math.abs(row - s.y);
    if (s.radius < dy) return;
    const dx = s.radius - dy;
    for (let x = s.x - dx; x < s.x + dx; x++) {
      res.add(x);
    }
  });
  return res.size;
};


const part2 = (sensors: Sensor[], min: number, max: number): number => {
  const minY = Math.max(sensors.reduce((a: number, b: Sensor) => Math.min(a, b.y - b.radius), sensors[0].y), min);
  const maxY = Math.min(sensors.reduce((a: number, b: Sensor) => Math.max(a, b.y + b.radius), sensors[0].y), max + 1);
  const sLen = sensors.length;
  const startTime = Date.now();
  for (let y = minY; y < maxY; y++) {
    if (y % 1000 === 0) {
      const progress = y / max;
      const time = (Date.now() - startTime) / 1000;
      console.log(`Progress: ${(progress * 100).toFixed(2)}%, ${y} of ${max} comparisons run, time left: ${((time / progress) - time).toFixed(1)}s`);
    }
    const set: Set<number> = new Set();
    for (let i = 0; i < sLen; i++) {
      if (set.size === max + 1) break;
      const s = sensors[i];
      const dy = Math.abs(y - s.y);
      if (s.radius < dy) continue;
      const dx = s.radius - dy;
      const maxX = Math.min(s.x + dx + 1, max + 1);
      const minX = Math.max(s.x - dx, min);
      for (let x = minX; x < maxX; x++) {
        set.add(x);
      }
    }
    if (set.size === max + 1) continue;
    for (let x = min; x < max + 1; x++) {
      if (!set.has(x)) {
        return x * 400000 + y;
      }
    }


  }
  return 0;
};


main();