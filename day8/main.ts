import { readFileSync } from 'fs';
import {
  countScoreDown,
  countScoreLeft,
  countScoreRight,
  countScoreUp,
  isVisibleDown,
  isVisibleLeft,
  isVisibleRight,
  isVisibleUp,
  Params
} from './utils';

const part1 = () => {
  const input = readFileSync('day8/input.txt', 'utf-8');
  const grid: number[][] = input.split('\n').map((line) => line.split('').map((tree) => Number(tree)));
  const rowCount = grid.length;
  let visibleCount = 0;
  grid.forEach((row: number[], y: number) => {
    const colCount = grid[y].length;
    row.forEach((tree: number, x: number) => {
      if (y === 0 || y === rowCount - 1 || x === 0 || x === colCount - 1) {
        visibleCount += 1;
        return;
      }
      if (checkVisible(grid, x, y, tree)) {
        visibleCount += 1;
      }
    });
  });
  return visibleCount;
};

const checkVisible = (grid: number[][], col: number, row: number, height: number): boolean => {
  const params: Params = { grid, col, row, height };
  if (isVisibleUp({ ...params })) return true;
  if (isVisibleDown({ ...params })) return true;
  if (isVisibleLeft({ ...params })) return true;
  if (isVisibleRight({ ...params })) return true;
  return false;
};

const part2 = () => {
  const input = readFileSync('day8/input.txt', 'utf-8');
  const grid: number[][] = input.split('\n').map((line) => line.split('').map((tree) => Number(tree)));
  let score = 0;
  grid.forEach((row: number[], y: number) => {
    row.forEach((tree: number, x: number) => {
      score = Math.max(score, calculateScore(grid, x, y, tree));
    });
  });
  return score;
};

const calculateScore = (grid: number[][], col: number, row: number, height: number): number => {
  const params: Params = { grid, col, row, height };

  return (
    countScoreUp({ ...params }) *
    countScoreDown({ ...params }) *
    countScoreLeft({ ...params }) *
    countScoreRight({ ...params })
  );
};

console.log({ part1: part1(), part2: part2() });
