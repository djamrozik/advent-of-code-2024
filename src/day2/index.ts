import * as fs from "fs";
import path from "path";

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");
    const inputTextLines = inputText.split("\n");

    part1(inputTextLines)
    part2(inputTextLines)
};

const part1 = (reports: string[]) => {
    let score = 0
    for (const report of reports) {
        const r = report.split(' ').map(Number)
        if (isCorrectlyDecreasing(r) || isCorrectlyIncreasing(r)) {
            score++
        }
    }
    console.log('Number of safe reactors (part 1):', score)
}

const part2 = (reports: string[]) => {
    let score = 0
    for (const report of reports) {
        const r = report.split(' ').map(Number)
        for (let i = 0; i < r.length; i++) {
            const removed = [...r.slice(0, i), ...r.slice(i + 1)]
            if (isCorrectlyDecreasing(removed) || isCorrectlyIncreasing(removed)) {
                score++
                break
            }
        }
    }
    console.log('Number of safe reactors (part 2):', score)
}

const isCorrectlyIncreasing = (report: number[]) => {
    for (let i = 1; i < report.length; i++) {
        const prev = report[i-1]
        const cur = report[i]
        if (cur <= prev || cur > prev + 3) {
            return false
        }
    }
    return true
}

const isCorrectlyDecreasing = (report: number[]) => {
    for (let i = 1; i < report.length; i++) {
        const prev = report[i-1]
        const cur = report[i]
        if (cur >= prev || cur < prev - 3) {
            return false
        }
    }
    return true
}

run()
