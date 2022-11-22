import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input4.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 4');

async function parseData(): Promise<[string[], string[][][]]> {
    const data = await fetchData()
    const [rawDrawn, ...rawBoards] = data.split("\n\n")
    const numbersToExtract: string[] = rawDrawn.split(",")
    let boards = rawBoards.map((row) => {
        return row.split("\n").map((line) => {
            return line.split(/\s+/).map((num) => {
                return num;
            })
        })
    })

    const boardsMapped = boards.map((board) => {
        return board.map((row) => {
            return row.filter(function(element) {
                return element !== undefined && element !== '';
            })
        })
    })

    return [numbersToExtract, boardsMapped]
}

function extractNumbers(numbersToExtract: string[], boards: string[][][]): [string[], string[][] | undefined] {
    let numbersExtracted: string[] = []
    let boardWinnerRow = null
    let boardWinnerColumn = null
    for (let i = 1; i < numbersToExtract.length; i++) {
        numbersExtracted = numbersToExtract.slice(0, i)
        boardWinnerRow = boards.find((board: string[][]) => {
            return board.some(boardElement => {
                if (boardElement.length > 1) {
                    return boardElement.every(element => numbersExtracted.indexOf(element) > -1)
                } else {
                    return false
                }
            })
        })

        boardWinnerColumn = boards.find((board: string[][]) => {
            return board[0].some((a, i) => {
                const column = board.map((boardElement) => {
                    return boardElement[i]
                });

                if (column.length > 1) {
                    return column.every(element => numbersExtracted.indexOf(element) > -1)
                } else {
                    return false
                }
            })
        })


        if (boardWinnerRow !== null && boardWinnerRow !== undefined) {
            return [numbersExtracted, boardWinnerRow]
        }

        if (boardWinnerColumn !== null && boardWinnerColumn !== undefined) {
            return [numbersExtracted, boardWinnerColumn]
        }
    }

    return [numbersExtracted, [[]]];
}


function sumNotExtracted(extractedNumbers: string[], board: string[][]): number {
    const numberNotExtracted = board.flatMap((rows) => {
        return rows.filter((item) => {
            return !extractedNumbers.includes(item)
        })
    })

    return numberNotExtracted.reduce((acc, value) => acc + parseInt(value), 0)
}

const [numbersToExtract, boards] = await parseData()
const [numbersExtracted, boardWinner] = extractNumbers(numbersToExtract, boards)

if (boardWinner !== undefined) {
    const sum: number = sumNotExtracted(numbersExtracted, boardWinner)
    const total: number = sum * parseInt(numbersExtracted[numbersExtracted.length - 1])
    console.log("tot: ", total)
} else {
    console.log("Error")
}
