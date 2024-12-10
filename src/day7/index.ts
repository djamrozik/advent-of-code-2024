import * as fs from "fs";
import path from "path";

type CalcCombinationTest = {
    expectedTotal: number
    nums: number[]
}

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");
    const inputLines = inputText.split('\n')
    const calcCombinationTests = inputLines.map(lineToCalcCombinationTest)

    part1(calcCombinationTests)
    part2(calcCombinationTests)
};

const part1 = (tests: CalcCombinationTest[]) => {
    let score = 0
    for (const test of tests) {
        const possibleTotals = getPossibleTotalsTwoOps(test.nums)
        if (possibleTotals.includes(test.expectedTotal)) {
            score += test.expectedTotal
        }
    }
    console.log("Score (part 1)", score)
}

const part2 = (tests: CalcCombinationTest[]) => {
    let score = 0
    for (const test of tests) {
        const possibleTotals = getPossibleTotalsThreeOps(test.nums)
        if (possibleTotals.includes(test.expectedTotal)) {
            score += test.expectedTotal
        }
    }
    console.log("Score (part 2)", score)
}

const getPossibleTotalsThreeOps = (nums: number[]): number[] => {
    if (nums.length === 0) {
        return []
    }
    if (nums.length === 1) {
        return [nums[0]]
    }
    const otherTotals = getPossibleTotalsThreeOps(nums.slice(0, nums.length - 1))
    const res = []
    for (const total of otherTotals) {
        res.push(total + nums[nums.length - 1])
        res.push(total * nums[nums.length - 1])
        res.push(concatNums(total, nums[nums.length - 1]))
    }
    return res
}

const getPossibleTotalsTwoOps = (nums: number[]): number[] => {
    if (nums.length === 0) {
        return []
    }
    if (nums.length === 1) {
        return [nums[0]]
    }
    const otherTotals = getPossibleTotalsTwoOps(nums.slice(0, nums.length - 1))
    const res = []
    for (const total of otherTotals) {
        res.push(total + nums[nums.length - 1])
        res.push(total * nums[nums.length -1])
    }
    return res
}

const lineToCalcCombinationTest = (line: string): CalcCombinationTest => {
    const [total, numsStr] = line.split(':')
    return {
        expectedTotal: Number(total),
        nums: numsStr.trim().split(' ').map(Number)
    }
}

const concatNums = (num1: number, num2: number) => {
    return Number(num1.toString() + num2.toString())
}

run()
