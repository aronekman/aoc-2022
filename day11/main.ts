import { readFileSync } from 'fs';

interface Monkey {
  items: number[];
  operation: (old: number) => number;
  test: number;
  onTrue: number;
  onFalse: number;
  inspectCount: number;
}

const main = () => {
  const input = readFileSync('day11/input.txt', 'utf-8');
  const itemRegExp = new RegExp(/Starting items:/);
  const operationRegEXP = new RegExp(/Operation:/);
  const testRegEXP = new RegExp(/Test:/);
  const trueRegEXP = new RegExp(/If true:/);
  const falseRegEXP = new RegExp(/If false:/);
  let items: number[] = [];
  let operation: (old: number) => number;
  let onTrue: number;
  let onFalse: number;
  let test: number;
  const monkeys: Monkey[] = [];
  input.split('\n').forEach((line, i) => {
    if (line === '') {
      monkeys.push({ items, operation, test, onTrue, onFalse, inspectCount: 0 });
      return;
    }
    if (itemRegExp.test(line)) {
      items = line.match(/\d+/g).map(Number);
      return;
    }
    if (operationRegEXP.test(line)) {
      const [x, y] = line.match(/[+*] (\d|\S+)+/g)[0].split(' ');
      if (y === 'old') {
        operation = (old: number) => (x === '+' ? old + old : old * old);
      } else {
        operation = (old: number) => (x === '+' ? old + Number(y) : old * Number(y));
      }
      return;
    }
    if (testRegEXP.test(line)) {
      test = Number(line.match(/\d+/)[0]);
      return;
    }
    if (trueRegEXP.test(line)) {
      onTrue = Number(line.match(/\d+/)[0]);
      return;
    }
    if (falseRegEXP.test(line)) {
      onFalse = Number(line.match(/\d+/)[0]);
      return;
    }
  });
  monkeys.push({ items, operation, test, onTrue, onFalse, inspectCount: 0 });
  const prime = monkeys.reduce((a: number, b: Monkey) => a * b.test, 1);
  [...Array(10000)].forEach((_) => {
    monkeys.forEach((monkey: Monkey) => {
      while (monkey.items.length) {
        monkey.inspectCount += 1;
        const item = monkey.items.splice(0, 1)[0];
        const newItem = monkey.operation(item);
        if (newItem % monkey.test === 0) {
          monkeys[monkey.onTrue].items.push(newItem % prime);
        } else {
          monkeys[monkey.onFalse].items.push(newItem % prime);
        }
      }
    });
  });
  monkeys.map((monkey: Monkey, i: number) => {
    console.log(`Monkey ${i} inspected items ${monkey.inspectCount} times.`);
  });
  monkeys.sort((a, b) => b.inspectCount - a.inspectCount);
  console.log(monkeys[0].inspectCount * monkeys[1].inspectCount);
};

main();
