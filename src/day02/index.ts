import run from "aocrunner"

function sign(x) {
  return Math.sign(x)
  // return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(s => s.split(' '))
}

const levelSafety = (input: string[]) => {
  const dir = sign(input[1] - input[0])
  return input.every((curr, index, arr) => {
    if (index > 0) {
      const prev = arr[index - 1]
      const currDir = sign(curr - prev)
      const dist = Math.abs(curr - prev)
      return currDir === dir && dist < 4
    }
    return true
  }) ? 1 : 0
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, curr) => {
    return acc + levelSafety(curr)
  }, 0).toString()
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
