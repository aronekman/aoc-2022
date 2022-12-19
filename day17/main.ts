import { readFileSync } from 'fs';
import { comeToRest, moveOneDown, moveOneLeft, moveOneRight, prettyPrint } from './utils';

const rock1 = [['.', '.', '@', '@', '@', '@', '.']];
const rock2 = [
  ['.', '.', '.', '@', '.', '.', '.'],
  ['.', '.', '@', '@', '@', '.', '.'],
  ['.', '.', '.', '@', '.', '.', '.']
];
const rock3 = [
  ['.', '.', '.', '.', '@', '.', '.'],
  ['.', '.', '.', '.', '@', '.', '.'],
  ['.', '.', '@', '@', '@', '.', '.']
];
const rock4 = [
  ['.', '.', '@', '.', '.', '.', '.'],
  ['.', '.', '@', '.', '.', '.', '.'],
  ['.', '.', '@', '.', '.', '.', '.'],
  ['.', '.', '@', '.', '.', '.', '.']
];

const rock5 = [
  ['.', '.', '@', '@', '.', '.', '.'],
  ['.', '.', '@', '@', '.', '.', '.']
];

const main = () => {
  const input = readFileSync('day17/input.txt', 'utf-8');
  const jetPattern: string[] = input.split('');
  const layers: string[][] = [];
  let count = 0;
  let i = 0;
  while (count < 2022) {
    add3Empty(layers);
    if (count % 5 === 0) [...rock1].forEach((row) => layers.push([...row]));
    if (count % 5 === 1) [...rock2].forEach((row) => layers.push([...row]));
    if (count % 5 === 2) [...rock3].reverse().forEach((row) => layers.push([...row]));
    if (count % 5 === 3) [...rock4].reverse().forEach((row) => layers.push([...row]));
    if (count % 5 === 4) [...rock5].reverse().forEach((row) => layers.push([...row]));
    i = simulate(layers, jetPattern, i);
    //prettyPrint(layers);
    count++;
  }
  console.log(layers.length);
};

const add3Empty = (layers: string[][]) => {
  let i = 0;
  while (i < 3) {
    layers.push([...Array(7)].map((_) => '.'));
    i++;
  }
};

const simulate = (layers: string[][], jetPattern: string[], i: number): number => {
  let u = layers.length - 1;
  let d = layers.length - 1;
  let l = layers[u].indexOf('@');
  let r = layers[u].lastIndexOf('@');
  while (d > 0) {
    if (!layers[d - 1].includes('@')) break;
    l = Math.min(l, layers[d - 1].indexOf('@'));
    r = Math.max(r, layers[d - 1].lastIndexOf('@'));
    d--;
  }
  while (true) {
    if (i > jetPattern.length - 1) {
      i = 0;
    }
    if (jetPattern[i] === '>' && r < 6) {
      if (moveOneRight(layers, u, d)) {
        r++;
        l++;
      }
    }
    if (jetPattern[i] === '<' && l > 0) {
      if (moveOneLeft(layers, u, d)) {
        r--;
        l--;
      }
    }
    i++;

    if (!moveOneDown(layers, u, d)) return i;
    u--;
    d--;
  }
};

main();
