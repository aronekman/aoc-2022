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
    input.split('\n').map(row => {
      return [row.match(/Valve \S\S/)[0].split(' ')[1],
        {
          rate: Number(row.match(/rate=\d+/)[0].split('=')[1]),
          leadsTo: row.split(';')[1].match(/[A-Z][A-Z]/g),
          open: false
        }];
    })
  );

  const startTime = Date.now();
  console.log(part1(new Map(valves), 'AA', 1, 0));
  console.log(((Date.now() - startTime) / 1000).toFixed(2));
};

const part1 = (valves: Map<string, Valve>, current: string, minute: number, pressure: number): number => {
  if (minute === runTime) return pressure;
  if (![...valves].some(([_, v]) => v.rate > 0 && !v.open)) {
    return (runTime - minute) * pressure;
  }
  let max = pressure;
  const currentValve: Valve = valves.get(current);
  if (!currentValve.open && currentValve.rate > 0) {
    valves.set(current, { ...currentValve, open: true });
    max = Math.max(max, pressure + part1(new Map(valves), current, minute + 1, pressure + currentValve.rate));
  }
  return currentValve.leadsTo.reduce((a: number, b: string) => Math.max(a, pressure + part1(new Map(valves), b, minute + 1, pressure)), max);
};

main();