import re
input = open('day5/input.txt', 'r')


def main():
  line = input.readline()
  lenght = int(len(line) / 4)
  arr = [[] for _ in range(lenght)]
  while line != '\n':
    for i in range(lenght):
      char = line[i * 4 + 1:i*4 + 2]
      if char != ' ' and char.isalpha():
        arr[i].insert(0, char)
    line = input.readline()
  line = input.readline()
  while line:
    [amount, start, end] = [int(x) for x in re.findall(r'\d+', line)]
    for x in arr[start - 1][-amount:]:
      arr[end - 1].append(x)
    del arr[start - 1][-amount:]

    line = input.readline()
  res = ''
  for stack in arr:
    res += stack.pop()

  return res


print(main())
