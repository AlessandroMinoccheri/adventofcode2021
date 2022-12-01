import { promises as fsPromises } from 'fs';
import { join } from 'path';

type Line = {
    x1: number,
    x2: number,
    y1: number,
    y2: number
}

type Lines = Line[]

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input5.txt"),
        'utf-8',
    )
}


async function parseData(): Promise<Lines> {
    const data = await fetchData()
    const rows = data.split("\n")

    return rows.map((row) => {
        const parts = row.split(" -> ")

        if (undefined === parts[1]) {
            return {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0
            }
        }

        const start = parts[0].split(",")
        const end = parts[1].split(",")
        return {
            x1: parseInt(start[0]),
            x2: parseInt(end[0]),
            y1: parseInt(start[1]),
            y2: parseInt(end[1])
        }
    })
}

function calculate(lines: Lines): number {
    let matrix: number[][] = []

    for (var i = 0; i < 999; i++) {
        let temp: number[] = []
        for (var j = 0; j < 999; j++) {
            temp[j] = 0;
        }

        matrix[i] = temp
    }

    lines.map((line: Line) => {
        if (line.y1 === line.y2) {
            let i = line.x1
            let end = line.x2
            if (line.x1 > line.x2) {
                i = line.x2
                end = line.x1
            }
            for (i; i <= end; i++) {
                matrix[i][line.y1] = matrix[i][line.y1] + 1
            }
        } else if (line.x1 === line.x2) {
            let i = line.y1
            let end = line.y2
            if (line.y1 > line.y2) {
                i = line.y2
                end = line.y1
            }

            for (i; i <= end; i++) {
                matrix[line.x1][i] = matrix[line.x1][i] + 1
            }

        }
    })

    return matrix.reduce((acc: number, row: number[]) => {
        let count = row.filter((cell) => {
            return cell >= 2
        }).length

        return acc + count
    }, 0)
}

console.log('Advent of code 2021: day 5');

const lines: Lines = await parseData()
const total: number = calculate(lines)
console.log(total.toString())
