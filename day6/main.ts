import { readFileSync } from 'fs';

const hasDuplicates = (array: string[]) => {
  return new Set(array).size !== array.length;
};

const main = () => {
  const file = readFileSync('./day6/input.txt', 'utf-8');
  let count = 0;
  const lastFourteen = [];
  const a = file.split('').forEach((char, index, arr) => {
    count += 1;
    lastFourteen.push(char);
    if (lastFourteen.length < 15) return;
    lastFourteen.splice(0, 1);
    if (hasDuplicates(lastFourteen)) return;
    console.log(count);
    arr.length = index + 1;
  });
};

main();
