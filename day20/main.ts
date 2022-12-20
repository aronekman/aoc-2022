import { readFileSync } from 'fs';

const test = false;

interface Num {
  index: number;
  value: number;
}

const main = () => {
  const input = readFileSync(`day20/${test ? 'test_input' : 'input'}.txt`, 'utf-8');
  const numbers: Num[] = input.split('\n').map((x, i) => {
    return { index: i, value: Number(x) };
  });
  const p1 = part1([...numbers]);

  const p2 = part2([...numbers]);

  console.log('Part 1:', p1);
  console.log('Part 2:', p2);
};

const part1 = (numbers: Num[]): number => {
  const len = numbers.length;
  mix(numbers, len);
  const indexOfZero = numbers.findIndex((x) => x.value === 0);
  return (
    numbers[(indexOfZero + 1000) % len].value +
    numbers[(indexOfZero + 2000) % len].value +
    numbers[(indexOfZero + 3000) % len].value
  );
};

const mix = (numbers: Num[], length: number) => {
  for (let i = 0; i < length; i++) {
    const oldIndex = numbers.findIndex((x) => x.index === i);
    const temp = numbers.splice(oldIndex, 1)[0];
    const newIndex = (oldIndex + temp.value) % (length - 1);
    numbers.splice(newIndex, 0, temp);
  }
};

const part2 = (numbers: Num[]) => {
  const len = numbers.length;
  numbers = numbers.map(({ index, value }) => {
    return { index, value: value * 811589153 };
  });
  for (let count = 0; count < 10; count++) {
    mix(numbers, len);
  }
  const indexOfZero = numbers.findIndex((x) => x.value === 0);
  return (
    numbers[(indexOfZero + 1000) % len].value +
    numbers[(indexOfZero + 2000) % len].value +
    numbers[(indexOfZero + 3000) % len].value
  );
};

main();
