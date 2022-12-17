import { readFileSync } from 'fs';

interface Valve {
  rate: number;
  leadsTo: string[];
  open: boolean;
}

const runTime = 20;
const main = () => {
  const input = readFileSync('day16/input.txt', 'utf-8');
  const valves: Map<string, Valve> = new Map(
    input.split('\n').map((row) => {
      return [
        row.match(/Valve \S\S/)[0].split(' ')[1],
        {
          rate: Number(row.match(/rate=\d+/)[0].split('=')[1]),
          leadsTo: row.split(';')[1].match(/[A-Z][A-Z]/g),
          open: false
        }
      ];
    })
  );

  console.log(part1(new Map(valves)));
};

const part1 = (valves: Map<string, Valve>) => {
  const bestRoutes: Map<string, { sum: number; perMinute: number; opened: string[] }> = new Map([
    ['AA', { sum: 0, perMinute: 0, opened: [] }]
  ]);

  let i = 1;
  while (i < 30) {
    const prevBest: Map<string, { sum: number; perMinute: number; opened: string[] }> = new Map([...bestRoutes]);
    bestRoutes.clear();
    for (let [key, value] of prevBest.entries()) {
      if (!value.opened.includes(key) && valves.get(key).rate > 0) {
        bestRoutes.set(key, {
          sum: value.sum + value.perMinute + valves.get(key).rate,
          perMinute: value.perMinute + valves.get(key).rate,
          opened: [...value.opened, key]
        });
      }
    }
    for (let [key, value] of prevBest.entries()) {
      valves.get(key).leadsTo.forEach((v) => {
        if (!bestRoutes.has(v) || bestRoutes.get(v).sum < value.sum + value.perMinute) {
          bestRoutes.set(v, { sum: value.sum + value.perMinute, perMinute: value.perMinute, opened: value.opened });
        }
      });
    }
    for (let [key, value] of prevBest.entries()) {
      if (!bestRoutes.has(key) || bestRoutes.get(key).sum < value.sum + value.perMinute) {
        bestRoutes.set(key, { sum: value.sum + value.perMinute, perMinute: value.perMinute, opened: value.opened });
      }
    }

    i++;
    console.log(`== Minute ${i} ==`);
    for (let [key, value] of bestRoutes.entries()) {
      console.log({ key, sum: value.sum, perminute: value.perMinute, opened: value.opened.join(' ') });
    }
  }
  return [...bestRoutes.values()].reduce((a, { sum }) => Math.max(a, sum), 0);
};

main();
