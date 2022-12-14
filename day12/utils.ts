export interface Square {
  x: number;
  y: number;
  height: number;
}

export const dijkstra = (grid: Square[][], start: Square, end: Square): number => {
  const V = grid.reduce((a: number, b: Square[]) => a + b.length, 0);

  const dist: number[][] = [];
  const sptSet: boolean[][] = [];
  grid.forEach((row, y) => {
    dist.push([]);
    sptSet.push([]);
    row.forEach((_) => {
      dist[y].push(Number.MAX_SAFE_INTEGER);
      sptSet[y].push(false);
    });
  });
  dist[start.y][start.x] = 0;
  [...Array(V - 1)].forEach((_) => {
    const [uX, uY] = minDistance(dist, sptSet);
    sptSet[uY][uX] = true;
    grid.forEach((row, y) =>
      row.forEach((s: Square, x) => {
        if (
          !sptSet[y][x] &&
          isNeighour(s, uX, uY) &&
          dist[uY][uX] < Number.MAX_SAFE_INTEGER &&
          dist[uY][uX] + 1 < dist[y][x] &&
          grid[y][x].height <= grid[uY][uX].height + 1
        ) {
          dist[y][x] = dist[uY][uX] + 1;
        }
      })
    );
  });
  return dist[end.y][end.x];
};

export const minDistance = (dist: number[][], sptSet: boolean[][]): [number, number] => {
  let min = Number.MAX_VALUE;
  let minX: number;
  let minY: number;

  dist.forEach((row, y) =>
    row.forEach((_, x) => {
      if (!sptSet[y][x] && dist[y][x] <= min) {
        min = dist[y][x];
        minX = x;
        minY = y;
      }
    })
  );

  return [minX, minY];
};

export const isNeighour = (s: Square, x: number, y: number) => {
  return (s.y === y && Math.abs(s.x - x) < 2) || (s.x === x && Math.abs(s.y - y) < 2);
};
