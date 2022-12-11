
def main():
  input = open('day2/input.txt', 'r')
  lines = input.readlines()
  score = 0
  for line in lines:
    score += get_score(line.strip())
  print(score)


def get_score(moves):
  match moves:
    case 'A X':
      return 0 + 3
    case 'A Y':
      return 3 + 1
    case 'A Z':
      return 6 + 2
    case 'B X':
      return 0 + 1
    case 'B Y':
      return 3 + 2
    case 'B Z':
      return 6 + 3
    case 'C X':
      return 0 + 2
    case 'C Y':
      return 3 + 3
    case 'C Z':
      return 6 + 1
    case _:
      return 0


main()
