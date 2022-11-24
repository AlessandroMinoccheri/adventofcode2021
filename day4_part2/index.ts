import { promises as fsPromises } from 'fs';
import { join } from 'path';

const fetchData = async (): Promise<string> => {
    return fsPromises.readFile(
        join("./data/input4.txt"),
        'utf-8',
    )
}

console.log('Advent of code 2021: day 4 part2');

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
        const b = board.map((row) => {
            return row.filter(function(element) {
                return element !== undefined && element !== '';
            })
        })

        return b.filter((element) => {
            return element.length > 1
        })
    })

    return [numbersToExtract, boardsMapped]
}

function exists(element: string[][], container: string[][][]): boolean {
    const found = container.find((el) => {
        return el === element
    })

    if (!found) {
        return false
    }

    return true
}

function extractNumbers(numbersToExtract: string[], boards: string[][][]): [string[], string[][] | undefined] {
    let numbersExtracted: string[] = []
    let boardWinnerRow: string[][] | undefined = [[]]
    let winners: string[][][] = [[[]]]

    for (let i = 1; i < numbersToExtract.length; i++) {
        numbersExtracted = numbersToExtract.slice(0, i)
        boardWinnerRow = boards.find((board: string[][]) => {
            if (exists(board, winners)) {
                return false
            }

            return board.some(boardElement => {
                if (boardElement.length > 1) {
                    if (boardElement.every(element => numbersExtracted.indexOf(element) > -1)) {
                        winners.push(board)
                        return true
                    }
                    return false
                } else {
                    return false
                }
            })
        })

        if (boardWinnerRow !== null && boardWinnerRow !== undefined) {
            boards.find((board: string[][]) => {
                if (exists(board, winners)) {
                    return false
                }
                return board[0].some((a, i) => {
                    let extractColumn = (arr: string[][], column: number) => arr.map(x => x[column]);
                    let column = extractColumn(board, i)

                    if (column.length > 1) {
                        if (column.every(element => numbersExtracted.indexOf(element) > -1)) {
                            winners.push(board)
                            return true;
                        }
                        return false
                    } else {
                        return false
                    }
                })
            })
        }


        if (boards.length === winners.length) {
            return [numbersExtracted, winners[winners.length - 1]];
        }
    }
    return [numbersExtracted, winners[winners.length - 1]];
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
