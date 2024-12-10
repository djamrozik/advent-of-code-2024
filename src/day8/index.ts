import path from "path";
import * as fs from "fs";

type Antenna = {
    row: number
    col: number
    symbol: string
}

type GroupedAntennas = {
    [key: string]: Antenna[]
}

type Antinode = {
    row: number
    col: number
}

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");
    const grid = inputText.split("\n").map(line => line.split(''))

    part1(grid)
    part2(grid)
};

const part1 = (grid: string[][]) => {
    const antennas = getAllAntennas(grid)
    const groupedAntennas = groupAntennas(antennas)
    const antinodesSeen = new Set()

    for (const antennasGroup of Object.values(groupedAntennas)) {
        for (let i = 0; i < antennasGroup.length - 1; i++) {
            for (let j = i + 1; j < antennasGroup.length; j++) {
                const antinodes = getAntinodes(antennasGroup[i], antennasGroup[j])
                if (isInGrid(grid, antinodes[0].row, antinodes[0].col)) {
                    antinodesSeen.add(`${antinodes[0].row},${antinodes[0].col}`)
                }
                if (isInGrid(grid, antinodes[1].row, antinodes[1].col)) {
                    antinodesSeen.add(`${antinodes[1].row},${antinodes[1].col}`)
                }
            }
        }
    }

    console.log('Score (part 1)', antinodesSeen.size)
}

const part2 = (grid: string[][]) => {
    const antennas = getAllAntennas(grid)
    const groupedAntennas = groupAntennas(antennas)
    const antinodesSeen = new Set()

    for (const antennasGroup of Object.values(groupedAntennas)) {
        for (let i = 0; i < antennasGroup.length - 1; i++) {
            for (let j = i + 1; j < antennasGroup.length; j++) {
                const antinodes = getAntinodesString(grid, antennasGroup[i], antennasGroup[j])
                for (const antinode of antinodes) {
                    if (!isInGrid(grid, antinode.row, antinode.col)) {
                        continue
                    }
                    antinodesSeen.add(`${antinode.row},${antinode.col}`)
                }
            }
        }
    }

    console.log('Score (part 2)', antinodesSeen.size)
}

const getAllAntennas = (grid: string[][]): Antenna[] => {
    const res: Antenna[] = []
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] !== '.') {
                res.push({
                    row,
                    col,
                    symbol: grid[row][col]
                })
            }
        }
    }
    return res
}

const groupAntennas = (antennas: Antenna[]): GroupedAntennas => {
    const res: GroupedAntennas = {}
    for (const antenna of antennas) {
        if (antenna.symbol in res) {
            res[antenna.symbol].push(antenna)
        } else {
            res[antenna.symbol] = [antenna]
        }
    }
    return res
}

// note: may return an antinode that is outside the
// original grid
const getAntinodes = (a: Antenna, b: Antenna): [Antinode, Antinode] => {
    const aToBToC = {
        row: b.row + (b.row - a.row),
        col: b.col + (b.col - a.col)
    }
    const bToAToC = {
        row: a.row + (a.row - b.row),
        col: a.col + (a.col - b.col)
    }
    return [aToBToC, bToAToC]
}

// in this case we will get all the antinodes in a line from two antennas
// we are considering grid bounds in this case
const getAntinodesString = (grid: string[][], a: Antenna, b: Antenna): Antinode[] => {
    const res: Antinode[] = []
    res.push({
        row: a.row,
        col: a.col
    })
    res.push({
        row: b.row,
        col: b.col
    })

    // a to b direction
    let nextItem = {
        row: b.row + (b.row - a.row),
        col: b.col + (b.col - a.col)
    }
    while (isInGrid(grid, nextItem.row, nextItem.col)) {
        res.push(nextItem)
        nextItem = {
            row: nextItem.row + (b.row - a.row),
            col: nextItem.col + (b.col - a.col)
        }
    }

    // b to a direction
    nextItem = {
        row: a.row + (a.row - b.row),
        col: a.col + (a.col - b.col)
    }
    while (isInGrid(grid, nextItem.row, nextItem.col)) {
        res.push(nextItem)
        nextItem = {
            row: nextItem.row + (a.row - b.row),
            col: nextItem.col + (a.col - b.col)
        }
    }

    return res
}

const isInGrid = (grid: string[][], row: number, col: number) => {
    if (row < 0 || row >= grid.length) {
        return false
    }
    if (col < 0 || col >= grid[0].length) {
        return false
    }
    return true
}

run()
