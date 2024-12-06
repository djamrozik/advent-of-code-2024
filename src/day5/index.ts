import * as fs from "fs";
import path from "path";

const run = async () => {
    const joinedPath = path.join(__dirname, "input.txt");
    const inputText = fs.readFileSync(joinedPath, "utf8");

    const inputLines = inputText.split('\n')
    const emptyLineIdx = inputLines.indexOf('')
    const orderingRules = inputLines.slice(0, emptyLineIdx)
    const updates = inputLines.slice(emptyLineIdx+1)

    part1(orderingRules, updates)
    part2(orderingRules, updates)
};


// -- Part 1 approach
// --
// -- for each update, look at the first num
// -- for that first num, look at what nums precede it
// -- none of those preceding nums should be in the set 
// -- of remaining nums, if they are, invalid updates
const part1 = (orderingRules: string[], updates: string[]) => {
    let score = 0

    for (const update of updates) {
        const nums = update.split(',')
        if (isValidUpdate(orderingRules, nums)) {
            score += Number(nums[Math.floor(nums.length / 2)])
        }
    }

    console.log('Score (part 1)', score)
}

// -- Part 2 approach
// --
// -- given a list of numbers, there should be one number which is first
// -- go through each num (order doesn't matter)
// -- guaranteed that there is one num which doesn't have 
// -- a preceding element that is in the set of remaining nums
const part2 = (orderingRules: string[], updates: string[]) => {
    let score = 0

    for (const update of updates) {
        const nums = update.split(',')
        if (isValidUpdate(orderingRules, nums)) {
            continue
        }
        const sortedNums = sortNums(orderingRules, nums)
        score += Number(sortedNums[Math.floor(sortedNums.length / 2)])
    }

    console.log('Score (part 2)', score)
}

const isValidUpdate = (orderingRules: string[], updateNums: string[]): boolean => {
    const remainingNumsSet = new Set(updateNums)
    const nums = [...updateNums]

    while (nums.length) {
        for (const rule of orderingRules) {
            const [first, second] = rule.split('|')
            if (second === nums[0]) {
                if (remainingNumsSet.has(first)) {
                    return false
                }
            }
        }
        remainingNumsSet.delete(nums[0])
        nums.splice(0, 1)
    }

    return true
}

const sortNums = (orderingRules: string[], updateNums: string[]): string[] => {
    const remainingNumsSet = new Set(updateNums)
    let nums = [...updateNums]
    const sortedRes: string[] = []

    while (nums.length) {
        for (const num of nums) {
            let isFirstNum = true
            for (const rule of orderingRules) {
                const [first, second] = rule.split('|')
                if (second === num && remainingNumsSet.has(first)) {
                    isFirstNum = false
                }
            }
            if (isFirstNum) {
                sortedRes.push(num)
                remainingNumsSet.delete(num)
                nums = nums.filter(x => x !== num)
                break
            }
        }
    }

    return sortedRes
}

run()
