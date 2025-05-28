# Terminal Grid Navigator

A simple interactive terminal app in TypeScript that lets you move a cursor around a grid using `HJKL` keys (vim-style controls). The UI updates smoothly in-place, showing the current cursor position and target.

---

## Features

-   Real-time keyboard input handling in terminal
-   Cursor movement constrained within boundaries
-   Dynamic rendering with clean frame updates (no scroll)
-   Simple coordinate tracking with previous position support
-   Easy to customize grid size, cursor/target characters, and controls

---

## Controls

| Key    | Action     |
| ------ | ---------- |
| H      | Move Left  |
| J      | Move Down  |
| K      | Move Up    |
| L      | Move Right |
| Ctrl+C | Exit       |

---

## Installation

```bash
npm install
```
