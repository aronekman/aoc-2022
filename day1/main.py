input = open('day1/input.txt', 'r')
lines = input.readlines()
calories = []
current_calories = 0
for line in lines:
  if line == '\n':
    calories.append(current_calories)
    current_calories  = 0
    continue
  current_calories += int(line)   

calories.sort(reverse=True)
print(calories[0] + calories[1] + calories[2])