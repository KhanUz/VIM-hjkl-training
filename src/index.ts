#!/usr/bin/env node

const readline = require("readline")

var stdin = process.stdin;

stdin.setRawMode(true);
stdin.setEncoding('utf8');


interface Coords {
    x: number,
    y: number
}

enum Direction {
    Up = "k",
    Down = "j",
    Left = "h",
    Right = "l",
}

async function main() {


    const width = 50;
    const height = 10;
    const emtyChar = "⋅"
    const cursorChar = "█"
    const targetChar = "★"



    function createView(width: number, heidth: number): string[][] {
        return (new Array(heidth)).fill(null).map(_ => new Array(width).fill(null).map(_ => emtyChar))
    }

    function draw(view: string[][], width: number, height: number): void {





        readline.cursorTo(process.stdout, 0, 0);         // Move to top
        readline.clearScreenDown(process.stdout);        // Clear below
        process.stdout.write(`🟢 STATUS: Running\n`);
        process.stdout.write(`Go to ${targetChar}, use HJKL to move(Like in VIM)\n\n`);
        for (let i = 0; i < view.length; i++) {

            process.stdout.write(view[i].join("") + "\n");
        }
    }
    function getRandomCoords(): Coords {
        return {
            x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)
        }
    }
    function validateCursor(cursorCoord: Coords, targetCoord: Coords) {
        return cursorCoord.x === targetCoord.x && cursorCoord.y === targetCoord.y;
    }
    function getUserInput(): Promise<string> {
        return new Promise((resolve) => {
            stdin.once('data', (key: string) => {
                if (key === '\u0003') process.exit();
                resolve(key);
            });
        });
    }

    function addXto(view: string[][], cursor: Char) {

        view[cursor.prevCoord.y][cursor.prevCoord.x] = emtyChar;
        view[cursor.Coord.y][cursor.Coord.x] = cursor.char;
    }

    const cursorCoord: Coords = { x: 0, y: 0 }

    class Char {
        char: string;
        #coordinates: Coords;
        #prevCoordinates: Coords;
        constructor(char: string, coord: Coords) {
            this.char = char;
            this.#coordinates = coord;
            this.#prevCoordinates = { ...this.#coordinates };
        }
        move(key: string) {
            let { x, y } = this.#coordinates;
            switch (key) {
                case Direction.Down: y += 1; break;
                case Direction.Up: y -= 1; break;
                case Direction.Left: x -= 1; break;
                case Direction.Right: x += 1; break;
            }
            this.Coord = {
                x: Math.max(0, Math.min(x, width - 1)),
                y: Math.max(0, Math.min(y, height - 1))
            };
        }

        set Coord(value) {
            this.#prevCoordinates = { ...this.#coordinates }
            this.#coordinates = value

        }
        get prevCoord() {
            return this.#prevCoordinates;
        }
        get Coord() {
            return this.#coordinates
        }
    }
    async function run() {
        console.log();

        const view = createView(width, height);
        let cursor = new Char(cursorChar, cursorCoord)
        while (true) {

            let target = new Char(targetChar, getRandomCoords())
            addXto(view, target)

            while (!validateCursor(cursor.Coord, target.Coord)) {
                addXto(view, cursor)
                draw(view, width, height)
                cursor.move(await getUserInput())
            }
        }
    }
    run()
}

main()