import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input2.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 2');

async function calculate() {
    const movesData = await fetchData()
    const moves = movesData.split("\n");
    let x: number = 0
    let depth: number = 0
    
    for (const movesIndex in moves) {
        const [moveType, value] = moves[movesIndex].split(" ")
    
        if (moveType === "forward") {
            x += parseInt(value)
        }

        if (moveType === "up") {
            depth -= parseInt(value)
        }

        if (moveType === "down") {
            depth += parseInt(value)
        }
    }
    
    const result: number = x * depth
    console.log("Multiplication result between x and depth is: " + result)
}

calculate()
