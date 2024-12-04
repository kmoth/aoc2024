import run from "aocrunner"

const mulPattern = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g
const valuePattern = /\d{1,3}|don't\(\)|do\(\)/g
const doDontPattern = /don't\(\)|do\(\)/g

const parseInput = (rawInput: string) => {
  return rawInput.match(mulPattern)
    .map(m => m.match(valuePattern))
    .map(m => ((m[0].match(doDontPattern)?.length > 0) 
      ? m[0] 
      : [Number(m[0]), Number(m[1])])
    )
}

const part1 = (rawInput: string) => {
  return parseInput(rawInput)
    .filter(i => typeof i !== 'string')
    .reduce((acc, curr) => acc += curr[0] * curr[1], 0)
    .toString()
}

const part2 = (rawInput: string) => {
  let enabled = true
  return parseInput(rawInput)
    .filter(i => {
      if (typeof i === 'string') {
        enabled = i === 'do()'
        return false
      } 
      return enabled
    })
    .reduce((acc, curr) => acc += curr[0] * curr[1], 0)
    .toString()
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^don't()_mul(5,5)+mul(32,64]then(mul(11,8)undo()?mul(8,5))`,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
