import { readFileSync } from 'fs';

const main = () => {
  const input = readFileSync('day10/input.txt', 'utf-8');
  let x = 1;
  let cycle = 0;
  let crt: string[][] = [...Array(6)].map((_) => [...Array(40)].map((_) => ' '));
  input.split('\n').forEach((line) => {
    let cyclesToRun = 0;
    let addAfterCycle = 0;
    const [command, v] = line.split(' ');
    if (command === 'noop') {
      cyclesToRun = 1;
    }
    if (command === 'addx') {
      cyclesToRun = 2;
      addAfterCycle = Number(v);
    }
    [...Array(cyclesToRun)].map((_) => {
      if (Math.abs(x - (cycle % 40)) < 2) {
        crt[Math.floor(cycle / 40)][cycle % 40] = '#';
      } else {
        crt[Math.floor(cycle / 40)][cycle % 40] = '.';
      }
      cycle += 1;
    });
    x += addAfterCycle;
  });
  crt.map((line) => console.log(line.join('')));
};

main();
