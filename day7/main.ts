import { readFileSync } from 'fs';

interface Folder {
  parent?: Folder;
  name: string;
  files: File[];
  folders: Folder[];
}

interface File {
  name: string;
  size: number;
}

const main = () => {
  const file = readFileSync('./day7/input.txt', 'utf-8');
  let currCommand: string = '';
  const lines = file.split('\n');
  let folderStructure: Folder = { name: '/', files: [], folders: [] };
  let currFolder: Folder = { name: '/', files: [], folders: [] };
  lines.splice(0, 1);
  lines.forEach((line) => {
    const [a, b, c] = line.split(' ');
    if (a === '$') {
      if (b === 'cd') {
        if (c !== '..') {
          currFolder = currFolder.folders.find((f) => f.name === c);
        } else {
          currFolder = currFolder.parent;
        }
      }
      return;
    }
    if (a !== 'dir') {
      currFolder.files.push({ size: Number(a), name: b });
    } else {
      currFolder.folders.push({ parent: currFolder, name: b, files: [], folders: [] });
    }
  });
  while (currFolder.parent) {
    currFolder = currFolder.parent;
  }
  const toDelete = getTotalSize(currFolder) - 40000000;

  return findToDelete(currFolder, Number.MAX_VALUE, toDelete);
};

const getSizeReqursively = (folder: Folder): [number, number] => {
  let res = 0;
  let size = folder.files.reduce((a, b) => a + b.size, 0);
  folder.folders.forEach((f) => {
    const [ans, dirSize] = getSizeReqursively(f);
    size += dirSize;
    res += ans;
  });
  if (size < 100000) {
    res += size;
  }
  return [res, size];
};

const getTotalSize = (folder: Folder): number => {
  const size = folder.files.reduce((a, b) => a + b.size, 0);
  const foldersSize = folder.folders.reduce((a, b) => a + getTotalSize(b), 0);

  return size + foldersSize;
};

const findToDelete = (folder: Folder, currentSmallest: number, goal: number): [number, number] => {
  let curr = currentSmallest;
  let size = folder.files.reduce((a, b) => a + b.size, 0);
  folder.folders.forEach((f) => {
    const [s, res] = findToDelete(f, curr, goal);
    size += s;
    if (res < curr) {
      curr = res;
    }
  });
  if (size > goal) {
    return [size, Math.min(size, curr)];
  }
  return [size, currentSmallest];
};

console.log(main());
