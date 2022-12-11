from string import ascii_letters


def find_common_from_2(s1, s2):
  common = set(s1) & set(s2)
  return list(common)[0]


def find_common_from_3(s1, s2, s3):
  common = set(s1) & set(s2) & set(s3)
  return list(common)[0]


def part1():
  input = open('day3/input.txt')
  res = 0
  for line in input.readlines():
    s = line.strip()
    rs1 = s[:len(s) // 2]
    rs2 = s[len(s) // 2:]
    common = find_common_from_2(rs1, rs2)
    res += ascii_letters.index(common) + 1
  return res


def part2():
  input = open('day3/input.txt')
  res = 0
  group = []
  for line in input.readlines():
    group.append(line.strip())
    if (len(group) == 3):
      common = find_common_from_3(group[0], group[1], group[2])
      res += ascii_letters.index(common) + 1
      group = []
  return res


print(part2())
