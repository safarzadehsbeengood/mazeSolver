function generateMaze(DIM) {
    let stack = [];
    let maze = new Array(DIM);
    let next;
  for (let j = 0; j < DIM; j++) {
    maze[j] = new Array(DIM);
    for (let i = 0; i < DIM; i++) {
        maze[j][i] = new Cell(j, i);
    }
  }
  let current = maze[0][0];
  stack.push(current);
  while (stack.length > 0) {
    current = stack.pop();
    next = current.checkNeighbors(maze);
    if (next) {
        stack.push(current);
        removeWalls(current, next);
        next.visited = true;
        stack.push(next);
    }
  }
  for (let i = 0; i < DIM; i++) {
    for(let j = 0; j < DIM; j++) {
      maze[i][j].visited = false;
    }
  }
  return maze;
}

function removeWalls(a, b) {
  var x = a.j - b.j;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.i - b.i;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}