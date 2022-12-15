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
  const p1 = part1(sensors, 2000000);
  console.log('Part 1 finished');
  console.log('starting part 2...');

  const p2 = part2(sensors, 0, 4000000);

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

const part2 = (sensors: Sensor[], min, max): number => {
  const len = sensors.length;
  for (let i = 0; i < len; i++) {
    const s = sensors[i];
    let x = s.x;
    let y = s.y + s.radius + 1;
    while (y > s.y) {
      if (check(sensors, x, y, len, min, max)) return x * 4000000 + y;
      y -= 1;
      x += 1;
    }
    while (x > s.x) {
      if (check(sensors, x, y, len, min, max)) return x * 4000000 + y;
      y -= 1;
      x -= 1;
    }
    while (y < s.y) {
      if (check(sensors, x, y, len, min, max)) return x * 4000000 + y;
      y += 1;
      x -= 1;
    }
    while (x < s.x) {
      if (check(sensors, x, y, len, min, max)) return x * 4000000 + y;
      y += 1;
      x += 1;
    }
  }
  return 0;
};

const check = (sensors: Sensor[], x: number, y: number, len: number, min, max): boolean => {
  if (x < min || y < min || x > max || y > max) return false;
  for (let i = 0; i < len; i++) {
    if (isInRange(sensors[i], x, y)) return false;
  }
  return true;
};

const isInRange = (sensor: Sensor, x: number, y: number): boolean => {
  return Math.abs(y - sensor.y) + Math.abs(x - sensor.x) <= sensor.radius;
};


main();