"use strict";

export class MazeInfo {

    constructor() {
        this.CANVAS_WIDTH = 400,
        this.CANVAS_HEIGHT = 400;
        this.COLS_WIDTH = 40;
        this.NUM_COLS;
        this.NUM_ROWS;
        this.grid = [];
        this.stack = [];
    }

    getIndexCell(i, j) {
        if (i < 0 || j < 0 || i > this.NUM_COLS - 1 || j > this.NUM_ROWS - 1) {
            return -1;
        }
        return i + j * this.NUM_COLS;
    }    
}
