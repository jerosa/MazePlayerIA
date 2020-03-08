"use strict";

class CellWall {

    constructor(x1, y1, x2, y2) {
        this.enabled = true;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    show() {
        if (this.enabled) {
            P$.stroke(255);
            P$.line(this.x1, this.y1, this.x2, this.y2);
        }
    }
}

export class Cell {
    
    constructor(i, j, maze) {
        this.maze = maze;

        this.visited = false;

        this.i = i;
        this.j = j;

        this.x = i * this.maze.COLS_WIDTH;
        this.y = j * this.maze.COLS_WIDTH;
        
        this.cellWallTop = new CellWall(this.x, this.y, this.x + this.maze.COLS_WIDTH, this.y);
        this.cellWallRight = new CellWall(this.x + this.maze.COLS_WIDTH, this.y, this.x + this.maze.COLS_WIDTH, this.y + this.maze.COLS_WIDTH);
        this.cellWallBottom = new CellWall(this.x + this.maze.COLS_WIDTH, this.y + this.maze.COLS_WIDTH, this.x, this.y + this.maze.COLS_WIDTH);
        this.cellWallLeft = new CellWall(this.x, this.y + this.maze.COLS_WIDTH, this.x, this.y);
    }

    show() {
        // Draw walls
        this.cellWallTop.show();
        this.cellWallRight.show();
        this.cellWallBottom.show();
        this.cellWallLeft.show();

        if (this.visited) {
            P$.noStroke();
            P$.fill(255, 0, 255, 100);
            P$.rect(this.x, this.y, this.maze.COLS_WIDTH, this.maze.COLS_WIDTH);
        }
    }

    highlight() {
        P$.noStroke();
        P$.fill(0, 0, 255, 100);
        P$.rect(this.x, this.y, this.maze.COLS_WIDTH, this.maze.COLS_WIDTH);
    }

    checkNeighbours() {
        let neighbours = [];

        const top = this.maze.grid[this.maze.getIndexCell(this.i, this.j - 1)];
        const right = this.maze.grid[this.maze.getIndexCell(this.i + 1, this.j)];
        const bottom = this.maze.grid[this.maze.getIndexCell(this.i, this.j + 1)];
        const left = this.maze.grid[this.maze.getIndexCell(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0) {
            const rand = P$.floor(P$.random(0, neighbours.length));
            return neighbours[rand];
        }
        else {
            return undefined;
        }
    }

    removeWalls(nextCell) {
        // Horizontal movement
        const dirx = this.i - nextCell.i;

        switch (dirx) {
            // moving to the left
            case 1:
                this.cellWallLeft.enabled = false;
                nextCell.cellWallRight.enabled = false;
                break;
            // moving to the right
            case -1:                
                this.cellWallRight.enabled = false;
                nextCell.cellWallLeft.enabled = false;
                break;
        }

        // Vertical movement
        const diry = this.j - nextCell.j;
        switch (diry) {
            // moving to the top
            case 1:
                this.cellWallTop.enabled = false;
                nextCell.cellWallBottom.enabled = false;
                break;
            // moving to the bottom
            case -1:                
                this.cellWallBottom.enabled = false;
                nextCell.cellWallTop.enabled = false;
                break;
        }
    }
}
