import * as fs from "fs";
import path from "path";



type GridPos = {
    row: number
    col: number
    direction: Direction
}

type Direction = 'up' | 'down' | 'left' | 'right'

const charToDirection: {[key: string]: Direction} = {
    '>': 'right',
    '<': 'left',
    'v': 'down',
    '^': 'up'
}

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");

    const inputLines = inputText.split('\n')
    const grid = inputLines.map(line => line.split(''))

    part1(grid)
    part2(grid)
};

const part1 = (grid: string[][]) => {
    let currentPosition = getCurrentPosition(grid)
    const seen = new Set()

    const startChar = grid[currentPosition.row][currentPosition.col]
    const startRow = currentPosition.row
    const startCol = currentPosition.col
    grid[currentPosition.row][currentPosition.col] = '.'

    while (!isNextStepOffMap(grid, currentPosition)) {
        seen.add(`${currentPosition.row},${currentPosition.col}`)
        currentPosition = getNextPosition(grid, currentPosition)
    }

    grid[startRow][startCol] = startChar
    console.log('Score (part 1)', seen.size + 1)
}

const part2 = (grid: string[][]) => {
    let startPos = getCurrentPosition(grid)
    grid[startPos.row][startPos.col] = '.'
    let loops = 0

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] !== '.') {
                continue
            }
            if (row === startPos.row && col === startPos.col) {
                continue
            }
            grid[row][col] = 'X'
            if (hasLoop(grid, startPos)) {
                loops++
            }
            grid[row][col] = '.'
        }
    }
    
    console.log('Score (part 2)', loops)
}

const getCurrentPosition = (grid: string[][]): GridPos => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (['^', '>', '<', 'v'].includes(grid[row][col])) {
                return {
                    row,
                    col,
                    direction: charToDirection[grid[row][col]]
                }
            }
        }
    }
    throw new Error(`Did not find current position`)
}

const getNextPosition = (grid: string[][], currentPos: GridPos): GridPos => {
    if (currentPos.direction === 'up') {
        if (isAvailableSpot(grid, currentPos.row-1, currentPos.col)) {
            currentPos.row--
            return currentPos
        }
        currentPos.direction = 'right'
        return currentPos
    }

    if (currentPos.direction === 'right') {
        if (isAvailableSpot(grid, currentPos.row, currentPos.col + 1)) {
            currentPos.col++
            return currentPos
        }
        currentPos.direction = 'down'
        return currentPos
    }

    if (currentPos.direction === 'down') {
        if (isAvailableSpot(grid, currentPos.row+1, currentPos.col)) {
            currentPos.row++
            return currentPos
        } 
        currentPos.direction = 'left'
        return currentPos
    }

    if (currentPos.direction === 'left') {
        if (isAvailableSpot(grid, currentPos.row, currentPos.col-1)) {
            currentPos.col--
            return currentPos
        } 
        currentPos.direction = 'up'
        return currentPos
    }

    throw new Error("No valid direction")
}

const isNextStepOffMap = (grid: string[][], currentPos: GridPos): boolean => {
    if (currentPos.direction === 'up' && currentPos.row === 0) {
        return true
    }
    if (currentPos.direction === 'left' && currentPos.col === 0) {
        return true
    }
    if (currentPos.direction === 'down' && currentPos.row === grid.length - 1) {
        return true
    }
    if (currentPos.direction === 'right' && currentPos.col === grid[0].length - 1) {
        return true
    }
    return false
}

const isAvailableSpot = (grid: string[][], row: number, col: number): boolean => {
    return grid[row][col] === '.'
}

const hasLoop = (grid: string[][], startPos: GridPos): boolean => {
    let currentPos = {...startPos}
    const seen = new Set()
    while (!isNextStepOffMap(grid, currentPos)) {
        const posStr = `${currentPos.row},${currentPos.col},${currentPos.direction}`
        if (seen.has(posStr)) {
            return true
        }
        seen.add(posStr)
        currentPos = getNextPosition(grid, currentPos)
    }
    return false
}

const printGrid = (grid: string[][]) => {
    const lines = grid.map(line => line.join(''))
    console.log(lines.join('\n'))
}

run()
