import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input2.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 2 part 2');

async function calculate() {
    const movesData = await fetchData()
    const moves = movesData.split("\n");
    let x: number = 0
    let depth: number = 0
    let aim: number = 0
    
    for (const movesIndex in moves) {
        const [moveType, value] = moves[movesIndex].split(" ")
    
        if (moveType === "forward") {
            x += parseInt(value)
            depth += aim * parseInt(value)
        }

        if (moveType === "up") {
            aim -= parseInt(value)
        }

        if (moveType === "down") {
            aim += parseInt(value)
        }
    }
    
    const result: number = x * depth
    console.log("Multiplication result between x and depth is: " + result)
}

calculate()
