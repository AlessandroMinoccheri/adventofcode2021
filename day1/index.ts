import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 1');

async function measure() {
    const measurementsData = await fetchData()
    const measurements = measurementsData.split("\n");

    let increasedTime: number = 0
    let prevMeasurement = null
    
    for (const measurementIndex in measurements) {
        const index = parseInt(measurementIndex)
        if (index === 0) {
            continue
        }

        if (parseInt(measurements[index]) > parseInt(measurements[index - 1])) {
            increasedTime++
        }
    }

    console.log("Measurements increased " + increasedTime.toString() + " times")
}

measure()