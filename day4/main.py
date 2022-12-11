
input = open('day4/input.txt')


def main():
  res = 0
  for line in input.readlines():
    [assignment1, assignment2] = line.strip().split(',')
    [x1, x2] = [int(x) for x in assignment1.split('-')]
    [y1, y2] = [int(y) for y in assignment2.split('-')]
    if (x2 < y1 or x1 > y2):
      continue
    res += 1

  return res


print(main())
