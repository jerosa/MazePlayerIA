import { MazeInfo } from './maze';
import { Cell } from './cell';

import './libs/p5.gui';

const sketch = (p) => {
    let currentCell;

    let stopMaze = true;

    let maze;

    let paramsSlider = {
        frames: 20,
        framesMin: 1,
        framesMax: 100
    };
    
    p.setup = function() {
        maze = new MazeInfo();

        p.createCanvas(maze.CANVAS_WIDTH, maze.CANVAS_HEIGHT);
        maze.NUM_COLS = Math.floor(p.width/maze.COLS_WIDTH);
        maze.NUM_ROWS = Math.floor(p.height/maze.COLS_WIDTH);

        // gui
        let gui = p.createGui(this, 'Maze');

        gui.addButton("Start/Stop", function() {
            stopMaze = !stopMaze;
        });
        gui.addObject(paramsSlider);

        for (let i = 0; i < maze.NUM_ROWS; i++) {
            for (let j = 0; j < maze.NUM_COLS; j++) {
                const cell = new Cell(j, i, maze);
                maze.grid.push(cell);
            }
        }

        // Set current cell to first
        currentCell = maze.grid[0];
    }

    p.draw = function() {
        if (!stopMaze) {
            p.frameRate(paramsSlider.frames);


            p.background(51);
        
            maze.grid.forEach(cell => {
                cell.show();
            });
        
            // STEP 1 - Set initial cell/current cell as visited
            currentCell.visited = true;
            currentCell.highlight();
        
            // STEP 2 - While there are unvisted cells
            const nextCell = currentCell.checkNeighbours();
        
            // STEP 2.1 - Pick random neighbour
            if (nextCell) {
                nextCell.visited = true;
        
                // add cell to stack for backtrack
                maze.stack.push(currentCell);
        
                // STEP 2.3 - Remove walls between current and next cell
                currentCell.removeWalls(nextCell);
        
                // STEP 2.4 - Make next cell as current
                currentCell = nextCell;
            }
            // Check if its possible to backtrack
            else if (maze.stack.length > 0) {
                currentCell = maze.stack.pop();
            }
            else {
                stopMaze = true;
            }
        }
        
    }      
}


// Attaching p5 to window as a global var.
// Note that it's not wise to overwrite the 'p5' var as you 
// may still need to reference the raw library...
// There are other, lazier, ways to attach to window
// but this makes it clear that it was an explicit decision
// and conforms to 'use strict';
window.P$ = new p5(sketch, 'container');
