import { readFileSync } from 'fs';

const test = false;

interface Cube {
  x: number;
  y: number;
  z: number;
  neighbours: number;
}

interface Cordinate {
  x: number;
  y: number;
  z: number;
}

const main = () => {
  const input = readFileSync(`day18/${test ? 'test_input' : 'input'}.txt`, 'utf-8');
  const cubes: Cube[] = input.split('\n').map((row) => {
    const [x, y, z] = row.split(',');
    return { x: Number(x), y: Number(y), z: Number(z), neighbours: 0 };
  });
  addNeighbours(cubes);
  const p1 = part1(cubes);
  console.log('Part 1:', p1);
  const unreachableWalls = findUnreachableWalls(cubes);
  console.log('Part2:', p1 - unreachableWalls);
};

const part1 = (cubes: Cube[]) => {
  return cubes.reduce((a: number, b: Cube) => a + 6 - b.neighbours, 0);
};

const findUnreachableWalls = (cubes: Cube[]) => {
  const minX = cubes.reduce((a: number, b: Cube) => Math.min(a, b.x), cubes[0].x);
  const minY = cubes.reduce((a: number, b: Cube) => Math.min(a, b.y), cubes[0].y);
  const minZ = cubes.reduce((a: number, b: Cube) => Math.min(a, b.z), cubes[0].z);
  const maxX = cubes.reduce((a: number, b: Cube) => Math.max(a, b.x), cubes[0].x);
  const maxY = cubes.reduce((a: number, b: Cube) => Math.max(a, b.y), cubes[0].y);
  const maxZ = cubes.reduce((a: number, b: Cube) => Math.max(a, b.z), cubes[0].z);

  let sum = 0;
  for (let z = minZ + 1; z < maxZ; z++) {
    for (let y = minY + 1; y < maxY; y++) {
      for (let x = minX + 1; x < maxX; x++) {
        if (cubes.find((cube) => cube.x === x && cube.y === y && cube.z === z)) continue;
        const visited: Cordinate[] = [];
        if (!canEscape(x, y, z, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) {
          sum += countNeighbours(cubes, x, y, z);
        }
      }
    }
  }
  return sum;
};
const addNeighbours = (cubes: Cube[]) => {
  cubes.forEach((cube: Cube) => {
    cube.neighbours = countNeighbours(cubes, cube.x, cube.y, cube.z);
  });
};

const countNeighbours = (cubes: Cube[], x: number, y: number, z: number) => {
  return cubes.filter(
    (cube) =>
      (x === cube.x && y === cube.y && Math.abs(cube.z - z) === 1) ||
      (x === cube.x && z === cube.z && Math.abs(cube.y - y) === 1) ||
      (y === cube.y && z === cube.z && Math.abs(cube.x - x) === 1)
  ).length;
};
const canEscape = (
  x: number,
  y: number,
  z: number,
  cubes: Cube[],
  visited: Cordinate[],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number
): boolean => {
  if (visited.find((c) => c.x === x && c.y === y && c.z === z)) return false;
  visited.push({ x, y, z });
  if (cubes.find((c) => c.x === x && c.y === y && c.z === z)) return false;
  if (x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ) return true;
  if (canEscape(x - 1, y, z, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  if (canEscape(x + 1, y, z, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  if (canEscape(x, y - 1, z, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  if (canEscape(x, y + 1, z, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  if (canEscape(x, y, z - 1, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  if (canEscape(x, y, z + 1, cubes, visited, minX, maxX, minY, maxY, minZ, maxZ)) return true;
  return false;
};

main();
