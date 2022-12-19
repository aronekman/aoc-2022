import { readFileSync } from 'fs';

const test = false;

interface Cube {
  x: number;
  y: number;
  z: number;
  neighbours: number;
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
};

const part1 = (cubes: Cube[]) => {
  return cubes.reduce((a: number, b: Cube) => a + 6 - b.neighbours, 0);
};

const addNeighbours = (cubes: Cube[]) => {
  cubes.forEach((cube: Cube) => {
    const neighbours = cubes.filter(
      ({ x, y, z }) =>
        (x === cube.x && y === cube.y && Math.abs(cube.z - z) === 1) ||
        (x === cube.x && z === cube.z && Math.abs(cube.y - y) === 1) ||
        (y === cube.y && z === cube.z && Math.abs(cube.x - x) === 1)
    );
    cube.neighbours = neighbours.length;
  });
};

main();
