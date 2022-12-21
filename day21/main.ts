import { readFileSync } from 'fs';

const test = false;

interface Operation {
  monkey1: string;
  operation: string;
  monkey2: string;
}

type Monkey = number | Operation;

const main = () => {
  const input = readFileSync(`day21/${test ? 'test_input' : 'input'}.txt`, 'utf-8');
  const monkeys: Map<string, Monkey> = new Map();
  input.split('\n').forEach((row) => {
    const key = row.match(/\S\S\S\S/)[0];
    monkeys.set(
      key,
      !!row.match(/\d+/)
        ? Number(row.match(/\d+/)[0])
        : {
            monkey1: row.match(/\S\S\S\S/g)[1],
            operation: row.match(/[+\-*/]/)[0],
            monkey2: row.match(/\S\S\S\S/g)[2]
          }
    );
  });
  const p1 = part1(monkeys, 'root');
  const p2 = part2(monkeys, 'root', 0);
  console.log('Part 1:', p1);
  console.log('Part 2:', p2);
};
const part1 = (monkeys: Map<string, Monkey>, current: string): number => {
  const value = monkeys.get(current);
  if (typeof value === 'number') return value;
  return calculate(part1(monkeys, value.monkey1), value.operation, part1(monkeys, value.monkey2));
};

const part2 = (monkeys: Map<string, Monkey>, current: string, comparison): number => {
  const value = monkeys.get(current);
  if (current === 'humn') return comparison;
  if (typeof value === 'number') return value;
  let search: string;
  let otherValue: number;
  let side: string;
  if (findHumn(monkeys, value.monkey1)) {
    side = 'left';
    search = value.monkey1;
    otherValue = part1(monkeys, value.monkey2);
  } else {
    side = 'right';
    search = value.monkey2;
    otherValue = part1(monkeys, value.monkey1);
  }
  if (current === 'root') {
    return part2(monkeys, search, otherValue);
  }
  switch (value.operation) {
    case '+':
      return part2(monkeys, search, comparison - otherValue);
    case '-':
      if (side === 'left') {
        return part2(monkeys, search, comparison + otherValue);
      } else {
        return part2(monkeys, search, otherValue - comparison);
      }
    case '*':
      return part2(monkeys, search, comparison / otherValue);
    case '/':
      if (side === 'left') {
        return part2(monkeys, search, comparison * otherValue);
      } else {
        return part2(monkeys, search, otherValue / comparison);
      }
  }
};

const findHumn = (monkeys: Map<string, Monkey>, current: string): boolean => {
  if (current === 'humn') return true;
  const value = monkeys.get(current);
  if (typeof value === 'number') return false;
  return findHumn(monkeys, value.monkey1) || findHumn(monkeys, value.monkey2);
};

/*const helper = (monkeys: Map<string, Monkey>, current: string): [number, string] => {
  const value = monkeys.get(current);
  if (typeof value === 'number') return [0, 'false'];
  if (value.monkey1 === 'humn') {
    return [];
  }
  return [1, 'je'];
};*/

const calculate = (num1: number, operation: string, num2: number): number => {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
};

main();
