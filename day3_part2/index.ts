import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input3.txt"),
        'utf-8',
    )
}


function filterElements(elements: string[], search: string, position: number): string[] {
    if (elements.length === 1) {
        return elements
    }

    return elements.filter(element => element[position] === search);
}

function parseDataOxygen(elements: string[]): number {
    const length: number = elements[0].length
    let one = 0
    let zero = 0
    for (let i = 0; i < length; i++) {
        one = 0
        zero = 0
        for (let k = 0; k < elements.length; k++) {
            if (elements[k][i] === "1") {
                one++
            } else {
                zero++
            }
        }

        if (one >= zero) {
            elements = filterElements(elements, "1", i)
        } else {
            elements = filterElements(elements, "0", i)
        }

        if (elements.length === 1) {
            return parseInt(elements[0], 2)
        }
    }

    return parseInt(elements[0], 2)
}


function parseDataCo2(elements: string[]): number {
    const length: number = elements[0].length
    let one = 0
    let zero = 0
    for (let i = 0; i < length; i++) {
        one = 0
        zero = 0
        for (let k = 0; k < elements.length; k++) {
            if (elements[k][i] === "1") {
                one++
            } else {
                zero++
            }
        }

        if (one < zero) {
            elements = filterElements(elements, "1", i)
        } else {
            elements = filterElements(elements, "0", i)
        }

        if (elements.length === 1) {
            return parseInt(elements[0], 2)
        }
    }

    return parseInt(elements[0], 2)
}

console.log('Advent of code 2021: day 3 part2');

async function calculate() {
    const binaryData = await fetchData()
    const binaries = binaryData.split("\n");
    let oxygenGeneratorRating = parseDataOxygen(binaries)
    let co2ScrubberRating = parseDataCo2(binaries)
    
    const result: number = oxygenGeneratorRating * co2ScrubberRating
    console.log("Oxygen is: " + result)
}

calculate()
