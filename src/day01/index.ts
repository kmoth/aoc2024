import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const left = []
  const right = []
  rawInput.split('\n').map(s => {
    const a = s.split('   ')
    left.push(a[0])
    right.push(a[1])
  })
  left.sort()
  right.sort()

  return {
    left,
    right
  }
}

const part1 = (rawInput: string) => {
  const { left, right } = parseInput(rawInput)
  return left.reduce((acc, curr, index) => {
    const d = Math.abs(curr - right[index])
    return acc + d
  }, 0).toString()
}

const part2 = (rawInput: string) => {
  const cache = {}
  const { left, right } = parseInput(rawInput)
  return left.reduce((acc, curr, index) => {
    cache[curr] ??= right.filter(r => r === curr).length
    return acc + (cache[curr] * curr)
  }, 0).toString()
}

run({
  part1: {
    tests: [
      {
        input: `
          3   4
          4   3
          2   5
          1   3
          3   9
          3   3
        `,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          3   4
          4   3
          2   5
          1   3
          3   9
          3   3
        `,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
