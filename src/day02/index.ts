import run from "aocrunner"

const MAX_DIST = 3

const sign = (x) => {
  return Math.sign(x)
}

const inRange = (x) => {
  return x >= (MAX_DIST * -1) && x <= MAX_DIST
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(s => s.split(' ').map(s => Number(s)))
}

const isPairSafe = (curr: number, next: number, dir: number) => {
  const dist = next - curr
  const safe = dist !== 0 && inRange(dist) && sign(dist) === dir
  return safe
}

const levelSafety = (input: number[], dampen: boolean) => {
  const loopCount = input.length - 1
  const checkMax = input.length - 2
  const dir = sign(input[1] - input[0])
  let result = false
  for (let i = 0; i < loopCount; i++) {
    const current = input[i]
    if (!isPairSafe(current, input[i + 1], dir)) {
      if (dampen && i < checkMax && isPairSafe(current, input[i + 2], dir)) {
        result = true
      } else {
        result = false
        break
      }
    } else {
      result = true
    }
  }
  return result
}

const isSafeLevel = (input: number[]) => {
  return input.map((curr, index, arr) => 
    arr.toSpliced(index, 1)
  ).some(t => levelSafety(t, false))
}

const part1 = (rawInput: string) => {
  return parseInput(rawInput)
    .reduce((acc, curr) => {
      return acc + (levelSafety(curr, false) ? 1 : 0)
    }, 0).toString()
}

const part2 = (rawInput: string) => {
  return parseInput(rawInput)
    .reduce((acc, curr) => {
      return acc + (levelSafety(curr, false) || isSafeLevel(curr) ? 1 : 0)
    }, 0).toString()
}

run({
  part1: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
          `,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
          `,
        expected: "4",
      },
      {
        input: `
          82 80 78 76 74
          23 25 28 30 31 32 35 38
          19 16 15 13 10 7
          84 85 86 87 88 89
          86 84 83 80 78 76 75 73
          9 10 12 14 15 18
          18 21 23 24 25 28 29
          52 51 49 46 45 44
          11 14 16 17 20
          39 38 37 35 34 32 29 26
          `,
        expected: "10",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
