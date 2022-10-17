import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input3.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 3');

async function calculate() {
    const movesData = await fetchData()
    const moves = movesData.split("\n");
    let gammaRate: string = ""
    let epsilonRate: string = ""
    
    const elements = moves.length
    const length = moves[0].length
    let one = 0
    let zero = 0
    for (let i = 0; i < length; i++) {
        one = 0
        zero = 0
        for (let k = 0; k < elements; k++) {
            if (moves[k][i] === "1") {
                one++
            } else {
                zero++
            }
        }

        if (one > zero) {
            gammaRate += "1"
            epsilonRate += "0"
        } else {
            gammaRate += "0"
            epsilonRate += "1"
        }
    }


    const result: number = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
    console.log("Multiplication result is: " + result)
}

calculate()
