import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 2');

async function measure() {
    const measurementsData = await fetchData()
    const measurements = measurementsData.split("\n");

    let increasedTime: number = 0
    let prevMeasurement: number = 0
    
    for (const measurementIndex in measurements) {
        const index = parseInt(measurementIndex)

        const sum = parseInt(measurements[index]) + parseInt(measurements[index + 1]) + parseInt(measurements[index + 2])
        
        if (index === 0) {
            prevMeasurement = sum
            continue
        }
        if (sum > prevMeasurement) {
            increasedTime++
        }

        prevMeasurement = sum
    }

    console.log("Measurements increased " + increasedTime.toString() + " times")
}

measure()
