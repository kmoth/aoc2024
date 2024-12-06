import run from "aocrunner"

const xmas = 'XMAS'.split('')
const xmasLength = xmas.length

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(s => s.split(''))
}

const checkDir = (check: (arr, rowIndex, colIndex, i) => boolean, rowIndex, colIndex, arr) => {
  for (let i = 1; i < xmasLength; i++) 
    if (!check(arr, rowIndex, colIndex, i)) 
      return 0
  return 1
}

const rightBounds = (arr, rowIndex, colIndex, i) => colIndex + i < arr[rowIndex].length
const leftBounds = (colIndex, i) => colIndex - i > -1
const downBounds = (arr, rowIndex, i) => rowIndex + i < arr.length
const upBounds = (rowIndex, i) => rowIndex - i > -1

const right = (arr, rowIndex, colIndex, i) => 
  rightBounds(arr, rowIndex, colIndex, i) && 
  arr[rowIndex][colIndex + i] === xmas[i]

const left = (arr, rowIndex, colIndex, i) => 
  leftBounds(colIndex, i) && 
  arr[rowIndex][colIndex - i] === xmas[i]

const down = (arr, rowIndex, colIndex, i) => 
  downBounds(arr, rowIndex, i) && 
  arr[rowIndex + i][colIndex] === xmas[i]

const up = (arr, rowIndex, colIndex, i) => 
  upBounds(rowIndex, i) && 
  arr[rowIndex - i][colIndex] === xmas[i]

const rightDown = (arr, rowIndex, colIndex, i) => 
  rightBounds(arr, rowIndex, colIndex, i) && 
  downBounds(arr, rowIndex, i) && 
  arr[rowIndex + i][colIndex + i] === xmas[i]

const rightUp = (arr, rowIndex, colIndex, i) => 
  rightBounds(arr, rowIndex, colIndex, i) && 
  upBounds(rowIndex, i) && 
  arr[rowIndex - i][colIndex + i] === xmas[i]

const leftDown = (arr, rowIndex, colIndex, i) => 
  leftBounds(colIndex, i) && 
  downBounds(arr, rowIndex, i) && 
  arr[rowIndex + i][colIndex - i] === xmas[i]

const leftUp = (arr, rowIndex, colIndex, i) => 
  leftBounds(colIndex, i) && 
  upBounds(rowIndex, i) && 
  arr[rowIndex - i][colIndex - i] === xmas[i]


const checkMAS = (rowIndex, colIndex, arr) => {
  return checkDir(right, rowIndex, colIndex, arr) + 
    checkDir(left, rowIndex, colIndex, arr) + 
    checkDir(down, rowIndex, colIndex, arr) + 
    checkDir(up, rowIndex, colIndex, arr) + 
    checkDir(rightDown, rowIndex, colIndex, arr) + 
    checkDir(rightUp, rowIndex, colIndex, arr) + 
    checkDir(leftDown, rowIndex, colIndex, arr) + 
    checkDir(leftUp, rowIndex, colIndex, arr)
}

const checkXMAS = (rowIndex, colIndex, arr) => {
  // TODO: check four corners for opposing M's and S's
  return false
    // checkDir(rightDown, rowIndex, colIndex, arr) + 
    // checkDir(rightUp, rowIndex, colIndex, arr) + 
    // checkDir(leftDown, rowIndex, colIndex, arr) + 
    // checkDir(leftUp, rowIndex, colIndex, arr)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const col = input[rowIndex]
    for (let colIndex = 0; colIndex < col.length; colIndex++) {
      const cell = col[colIndex]
      if (col[colIndex] === 'X') {
        count += checkMAS(rowIndex, colIndex, input)
      }
    }
  }
  return count.toString()
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const col = input[rowIndex]
    for (let colIndex = 0; colIndex < col.length; colIndex++) {
      const cell = col[colIndex]
      if (col[colIndex] === 'A') {
        count += checkXMAS(rowIndex, colIndex, input)
      }
    }
  }
  return count.toString()
}

run({
  part1: {
    tests: [
      {
        input: `
          MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX
          `,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .M.S......
        ..A..MSMS.
        .M.S.MAA..
        ..A.ASMSM.
        .M.S.M....
        ..........
        S.S.S.S.S.
        .A.A.A.A..
        M.M.M.M.M.
        ..........
        `,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
