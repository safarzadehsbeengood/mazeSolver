var cnv;
let maze;
let frontier;
let w;
let stack = [];
let current;
let start, end;
let correctPath;
let i;
const DIM = 50;

function setup() {
  let winSize = min(windowWidth, windowHeight) - 100;
  cnv = createCanvas(winSize, winSize);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  // frameRate(10);
  maze = generateMaze(DIM);
  w = width / DIM;
  restart();
}

function restart() {
  maze = generateMaze(DIM);
  start = maze[0][0];
  start.visited = true;
  start.isPath = true;
  current = start;
  end = maze[DIM - 1][DIM - 1];
  correctPath = [];
  solve(maze, 0, 0, []);
  correctPath.reverse();
  current = correctPath[0];
  i = 0; 
}

function wallsToBin(walls) {
  let res = "";
  for (wall of walls) {
    if (wall) {
      res += "1";
    } else {
      res += "0";
    }
  }
  return res;
}

function getNeighbors(maze, i, j) {
  let neighbors = [];
  // below
  if (i < maze.length - 1 && !maze[i + 1][j].visited && !maze[i][j].walls[2]) {
    neighbors.push(maze[i + 1][j]);
  }
  // above
  if (i > 0 && !maze[i - 1][j].visited && !maze[i][j].walls[0]) {
    neighbors.push(maze[i - 1][j]);
  }
  // left
  if (j > 0 && !maze[i][j - 1].visited && !maze[i][j].walls[3]) {
    neighbors.push(maze[i][j - 1]);
  }
  // right
  if (
    j < maze[0].length - 1 &&
    !maze[i][j + 1].visited &&
    !maze[i][j].walls[1]
  ) {
    neighbors.push(maze[i][j + 1]);
  }

  return neighbors;
}

function MD(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2);
}

function showMaze(maze) {
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      maze[j][i].show();
    }
  }
}

function solve(maze, i, j) {
  // redraw();
  if (maze[i][j] === end) {
    return true;
  }
  maze[i][j].visited = true; // mark the current cell as visited
  let neighbors = getNeighbors(maze, i, j); // get the neighbors of the current cell
  // console.table(neighbors);
  if (neighbors) {
    // if it has neighbors,
    for (neighbor of neighbors) {
      if (solve(maze, neighbor.i, neighbor.j)) {
        correctPath.push(maze[i][j]);
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

function draw() {
  if (i > correctPath.length-1) {
    restart();
  }
  clear();
  background(0);
  correctPath[i].isPath = true;
  beginShape();
  noFill();
  stroke(0, 100, 250);
  strokeWeight(4)
  for (let x = 0; x <= i; x++) {
    vertex(correctPath[x].j*w+w/2, correctPath[x].i*w+w/2);
  }
  endShape();
  showMaze(maze);
  i++;
  current = correctPath[i];
  strokeWeight(5);
  stroke(255);
  noFill();
  rect(0, 0, width, height);
}