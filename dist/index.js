#!/usr/bin/env node
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
const readline = require("readline");
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');
var Direction;
(function (Direction) {
    Direction["Up"] = "k";
    Direction["Down"] = "j";
    Direction["Left"] = "h";
    Direction["Right"] = "l";
})(Direction || (Direction = {}));
async function main() {
    var _Char_coordinates, _Char_prevCoordinates;
    const width = 50;
    const height = 10;
    const emtyChar = "⋅";
    const cursorChar = "█";
    const targetChar = "★";
    function createView(width, heidth) {
        return (new Array(heidth)).fill(null).map(_ => new Array(width).fill(null).map(_ => emtyChar));
    }
    function draw(view, width, height) {
        readline.cursorTo(process.stdout, 0, 0); // Move to top
        readline.clearScreenDown(process.stdout); // Clear below
        process.stdout.write(`🟢 STATUS: Running\n`);
        process.stdout.write(`Go to ${targetChar}, use HJKL to move(Like in VIM)\n\n`);
        for (let i = 0; i < view.length; i++) {
            process.stdout.write(view[i].join("") + "\n");
        }
    }
    function getRandomCoords() {
        return {
            x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)
        };
    }
    function validateCursor(cursorCoord, targetCoord) {
        return cursorCoord.x === targetCoord.x && cursorCoord.y === targetCoord.y;
    }
    function getUserInput() {
        return new Promise((resolve) => {
            stdin.once('data', (key) => {
                if (key === '\u0003')
                    process.exit();
                resolve(key);
            });
        });
    }
    function addXto(view, cursor) {
        view[cursor.prevCoord.y][cursor.prevCoord.x] = emtyChar;
        view[cursor.Coord.y][cursor.Coord.x] = cursor.char;
    }
    const cursorCoord = { x: 0, y: 0 };
    class Char {
        constructor(char, coord) {
            _Char_coordinates.set(this, void 0);
            _Char_prevCoordinates.set(this, void 0);
            this.char = char;
            __classPrivateFieldSet(this, _Char_coordinates, coord, "f");
            __classPrivateFieldSet(this, _Char_prevCoordinates, { ...__classPrivateFieldGet(this, _Char_coordinates, "f") }, "f");
        }
        move(key) {
            let { x, y } = __classPrivateFieldGet(this, _Char_coordinates, "f");
            switch (key) {
                case Direction.Down:
                    y += 1;
                    break;
                case Direction.Up:
                    y -= 1;
                    break;
                case Direction.Left:
                    x -= 1;
                    break;
                case Direction.Right:
                    x += 1;
                    break;
            }
            this.Coord = {
                x: Math.max(0, Math.min(x, width - 1)),
                y: Math.max(0, Math.min(y, height - 1))
            };
        }
        set Coord(value) {
            __classPrivateFieldSet(this, _Char_prevCoordinates, { ...__classPrivateFieldGet(this, _Char_coordinates, "f") }, "f");
            __classPrivateFieldSet(this, _Char_coordinates, value, "f");
        }
        get prevCoord() {
            return __classPrivateFieldGet(this, _Char_prevCoordinates, "f");
        }
        get Coord() {
            return __classPrivateFieldGet(this, _Char_coordinates, "f");
        }
    }
    _Char_coordinates = new WeakMap(), _Char_prevCoordinates = new WeakMap();
    async function run() {
        console.log();
        const view = createView(width, height);
        let cursor = new Char(cursorChar, cursorCoord);
        while (true) {
            let target = new Char(targetChar, getRandomCoords());
            addXto(view, target);
            while (!validateCursor(cursor.Coord, target.Coord)) {
                addXto(view, cursor);
                draw(view, width, height);
                cursor.move(await getUserInput());
            }
        }
    }
    run();
}
main();
//# sourceMappingURL=index.js.map