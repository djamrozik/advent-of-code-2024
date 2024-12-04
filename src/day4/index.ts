import * as fs from "fs";
import path from "path";

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");

    part1(inputText)
    part2(inputText)
};

const part1 = (textInput: string) => {
    const grid = textInput.split('\n').map(line => line.split(''))
    let score = 0
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (isXMasTop(grid, row, col)) score++
            if (isXMasTopRight(grid, row, col)) score++
            if (isXMasRight(grid, row, col)) score++
            if (isXMasBottomRight(grid, row, col)) score++
            if (isXMasBottom(grid, row, col)) score++
            if (isXMasBottomLeft(grid, row, col)) score++
            if (isXMasLeft(grid, row, col)) score++
            if (isXMasTopLeft(grid, row, col)) score++
        }
    }
    console.log('Score (part 1)', score)
}

const part2 = (textInput: string) => {
    const grid = textInput.split('\n').map(line => line.split(''))
    let score = 0
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] !== 'A') continue
        
            const diag1 = grid[row-1][col-1] + grid[row+1][col+1]
            if (diag1 !== 'SM' && diag1 !== 'MS') {
                continue
            }

            const diag2 = grid[row+1][col-1] + grid[row-1][col+1]
            if (diag2 !== 'SM' && diag2 !== 'MS') {
                continue
            }

            score++
        }
    }
    console.log('Score (part 2)', score)
}

const isXMasTop = (grid: string[][], row: number, col: number) => {
    if (row <= 2) return false
    const str = grid[row][col] + grid[row-1][col] + grid[row-2][col] + grid[row-3][col]
    return str === 'XMAS'
}

const isXMasTopRight = (grid: string[][], row: number, col: number) => {
    if (col >= grid[0].length - 3) return false
    if (row <= 2) return false
    const str = grid[row][col] + grid[row-1][col+1] + grid[row-2][col+2] + grid[row-3][col+3]
    return str === 'XMAS'
}

const isXMasRight = (grid: string[][], row: number, col: number) => {
    if (col >= grid[0].length - 3) return false
    const str = grid[row][col] + grid[row][col+1] + grid[row][col+2] + grid[row][col+3]
    return str === 'XMAS'
}

const isXMasBottomRight = (grid: string[][], row: number, col: number) => {
    if (col >= grid[0].length - 3) return false
    if (row >= grid.length - 3) return false
    const str = grid[row][col] + grid[row+1][col+1] + grid[row+2][col+2] + grid[row+3][col+3]
    return str === 'XMAS'
}

const isXMasBottom = (grid: string[][], row: number, col: number) => {
    if (row >= grid.length - 3) return false
    const str = grid[row][col] + grid[row+1][col] + grid[row+2][col] + grid[row+3][col]
    return str === 'XMAS'
}

const isXMasBottomLeft = (grid: string[][], row: number, col: number) => {
    if (row >= grid.length - 3) return false
    if (col <= 2) return false
    const str = grid[row][col] + grid[row+1][col-1] + grid[row+2][col-2] + grid[row+3][col-3]
    return str === 'XMAS'
}

const isXMasLeft = (grid: string[][], row: number, col: number) => {
    if (col <= 2) return false
    const str = grid[row][col] + grid[row][col-1] + grid[row][col-2] + grid[row][col-3]
    return str === 'XMAS'
}

const isXMasTopLeft = (grid: string[][], row: number, col: number) => {
    if (col <= 2) return false
    if (row <= 2) return false
    const str = grid[row][col] + grid[row-1][col-1] + grid[row-2][col-2] + grid[row-3][col-3]
    return str === 'XMAS'
}

run()
