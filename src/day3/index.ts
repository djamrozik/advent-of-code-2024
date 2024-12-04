import * as fs from "fs";
import path from "path";

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");

    part1(inputText)
    part2(inputText)
};

const part1 = (inputText: string) => {
    const matches = [...inputText.matchAll(/mul\([0-9]+,[0-9]+\)/g)].map(m => m[0])
    let score = 0
    for (const mulText of matches) {
        const [a, b] = getNums(mulText).map(Number)
        score += (a * b)
    }
    console.log('Score (part 1)', score)
}

const part2 = (inputText: string) => {
    const matches = [...inputText.matchAll(/(mul\([0-9]+,[0-9]+\))|(do\(\))|(don't\(\))/g)].map(m => m[0])
    let enabled = true
    let score = 0
    for (const match of matches) {
        if (match === "don't()") {
            enabled = false
            continue
        }
        if (match === "do()") {
            enabled = true
            continue
        }
        if (enabled) {
            const [a, b] = getNums(match).map(Number)
            score += (a * b)
        }
    }
    console.log('Score (part 2)', score)
}

const getNums = (mulText: string) => {
    let numsText = mulText.slice("mul(".length)
    numsText = numsText.slice(0, numsText.length - 1)
    return numsText.split(",")
}

run()
