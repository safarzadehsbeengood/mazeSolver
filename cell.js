class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.isPath = false;
  }

  checkNeighbors(maze) {
    let i = this.i;
    let j = this.j;
    let neighbors = [];
    // down
    if (i < DIM - 1 && !maze[i + 1][j].visited) {
      neighbors.push(maze[i + 1][j]);
    }
    // right
    if (j < DIM - 1 && !maze[i][j + 1].visited) {
      neighbors.push(maze[i][j + 1]);
    }
    // up
    if (i > 0 && !maze[i - 1][j].visited) {
      neighbors.push(maze[i - 1][j]);
    }
    // left
    if (j > 0 && !maze[i][j - 1].visited) {
      neighbors.push(maze[i][j - 1]);
    }
    if (neighbors) {
      let r = floor(random(neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  show() {
    let x = this.j * w;
    let y = this.i * w;
    
    if (this == current) {
      stroke(0, 0, 255);
      fill(0, 0, 255);
      square(x+2, y+2, w-4);
    }

    stroke(255);
    strokeWeight(2);
    // top
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    // right
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    // bottom
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    // left
    if (this.walls[3]) {
      line(x, y, x, y + w);
    }
    if (this == start) {
      stroke(0, 255, 0);
      fill(0, 255, 0);
      square(x+2, y+2, w-4);
    }
    if (this == end) {
      stroke(255, 0, 0);
      fill(255, 0, 0);
      square(x+2, y+2, w-4);
    }
    if (this.isPath) {
      stroke(0, 255, 0, 0);
      fill(2550, 100, 200, 100);
      square(x+2, y+2, w);
    }
    // noStroke();
    // fill(255);
    // textSize(9);
    // text(wallsToBin(this.walls), x+4, y+16);
    // text(`[${this.i}][${this.j}]`, x+23, y+35);
  }
}
