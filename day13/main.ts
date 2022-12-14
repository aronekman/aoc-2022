import { readFileSync } from 'fs';

type Packet = number | Packet[]


const main = () => {
  const input = readFileSync('day13/input.txt', 'utf-8');
  const packets: Packet[] = [];
  input.split('\n').forEach(line => {
    if (line === '') return;
    packets.push(JSON.parse(line));

  });
  console.log('Part1:', part1(packets));
  //console.log('Part2:', part2(packets));
  console.log('Part2:', part2(packets));
};

const part1 = (packets: Packet[]) => {
  const res: number[] = [];
  let index = 1;
  for (let i = 0; i < packets.length - 1; i += 2) {
    if (compare(packets[i], packets[i + 1]) === 1) {
      res.push(index);
    }
    index++;
  }
  return res.reduce((a, b) => a + b, 0);
};

const part2 = (packets: Packet[]) => {
  let divider1: Packet = [[2]];
  let divider2: Packet = [[6]];
  packets.unshift(divider1);
  packets.unshift(divider2);
  [...Array(packets.length)].forEach((_, step) => {
    [...Array(packets.length - step - 1)].forEach((_, i) => {
      if (compare(packets[i], packets[i + 1]) === 3) {
        const temp = packets[i];
        packets[i] = packets[i + 1];
        packets[i + 1] = temp;
      }
    });
  });
  return (packets.indexOf(divider1) + 1) * (packets.indexOf(divider2) + 1);
};


const compare = (left: Packet, right: Packet): number => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) return 2;
    return left < right ? 1 : 3;
  }
  if (Number.isInteger(left) && Array.isArray(right)) {
    left = [left];
  }
  if (Array.isArray(left) && Number.isInteger(right)) {
    right = [right];
  }
  if (!Array.isArray(left) || !Array.isArray((right))) return 2;

  let i = 0;
  while (i < left.length && i < right.length) {
    const order = compare(left[i], right[i]);
    if (order === 1 || order === 3) return order;
    i++;
  }
  if (left.length === right.length) return 2;
  return left.length < right.length ? 1 : 3;
};


main();