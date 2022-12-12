export interface Params {
  grid: number[][];
  row: number;
  col: number;
  height: number;
}

export const isVisibleUp = (props: Params): boolean => {
  const { grid, row, col, height } = props;
  for (let y = row - 1; y >= 0; y--) {
    if (grid[y][col] >= height) {
      return false;
    }
  }
  return true;
};

export const isVisibleDown = (props: Params): boolean => {
  const { grid, row, col, height } = props;
  for (let y = row + 1; y < grid.length; y++) {
    if (grid[y][col] >= height) {
      return false;
    }
  }
  return true;
};

export const isVisibleLeft = (props: Params): boolean => {
  const { grid, row, col, height } = props;

  for (let x = col - 1; x >= 0; x--) {
    if (grid[row][x] >= height) {
      return false;
    }
  }
  return true;
};

export const isVisibleRight = (props: Params): boolean => {
  const { grid, row, col, height } = props;

  for (let x = col + 1; x < grid[row].length; x++) {
    if (grid[row][x] >= height) {
      return false;
    }
  }
  return true;
};

export const countScoreUp = (props: Params): number => {
  const { grid, row, col, height } = props;
  if (row === 0) return 0;
  let score = 0;
  for (let y = row - 1; y >= 0; y--) {
    score += 1;
    if (grid[y][col] >= height) {
      return score;
    }
  }
  return score;
};

export const countScoreDown = (props: Params): number => {
  const { grid, row, col, height } = props;
  if (row === grid.length - 1) return 0;
  let score = 0;
  for (let y = row + 1; y < grid.length; y++) {
    score += 1;
    if (grid[y][col] >= height) {
      return score;
    }
  }
  return score;
};

export const countScoreLeft = (props: Params): number => {
  const { grid, row, col, height } = props;
  if (col === 0) return 0;
  let score = 0;
  for (let x = col - 1; x >= 0; x--) {
    score += 1;
    if (grid[row][x] >= height) {
      return score;
    }
  }
  return score;
};

export const countScoreRight = (props: Params): number => {
  const { grid, row, col, height } = props;
  if (col === grid[row].length) return 0;
  let score = 0;
  for (let x = col + 1; x < grid[row].length; x++) {
    score += 1;
    if (grid[row][x] >= height) {
      return score;
    }
  }
  return score;
};
