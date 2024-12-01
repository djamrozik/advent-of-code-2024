import * as fs from "fs";
import path from "path";

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");
    const inputTextLines = inputText.split("\n");

    const leftNums = []
    const rightNums = []
    for (const line of inputTextLines) {
        const nums = line.split(/\s+/)
        leftNums.push(Number(nums[0]))
        rightNums.push(Number(nums[1]))
    }

    if (leftNums.length !== rightNums.length) {
        console.log("Array length mismatch")
        return
    }

    part1(leftNums, rightNums)
    part2(leftNums, rightNums)
};

const part1 = (leftNums: number[], rightNums: number[]) => {
    const leftNumsSorted = leftNums.sort((a, b) => (a - b))
    const rightNumsSorted = rightNums.sort((a, b) => (a - b))

    let totalDistance = 0
    for (let i = 0; i < leftNumsSorted.length; i++) {
        totalDistance += Math.abs(leftNumsSorted[i] - rightNumsSorted[i])
    }

    console.log('Total distance:', totalDistance)
}

const part2 = (leftNums: number[], rightNums: number[]) => {
    const rightSeen: {[key: number]: number} = {}
    for (const num of rightNums) {
        if (num in rightSeen) {
            rightSeen[num] += 1
        } else {
            rightSeen[num] = 1
        }
    }

    let score = 0
    for (const num of leftNums) {
        if (num in rightSeen) {
            score += (num * rightSeen[num])
        }
    }

    console.log('Similarity score:', score)
}

run();
