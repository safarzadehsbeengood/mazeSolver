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
      stroke(0, 100, 255);
      strokeWeight(1);
      fill(5, 100, 255);
      square(x+6, y+6, w-12);
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
      noStroke();
      fill(0, 255, 0);
      square(x, y, w);
    }
    if (this == end) {
      noStroke();
      fill(255, 0, 0);
      square(x, y, w);
    }
    // if (this.isPath) {
    //   noStroke();
    //   fill(0, 200, 200, 100);
    //   square(x, y, w);
    //   stroke(0);
    //   strokeWeight(4);
    //   point(x+w/2, y+w/2);
    // }
    // noStroke();
    // fill(255);
    // textSize(9);
    // text(wallsToBin(this.walls), x+4, y+16);
    // text(`[${this.i}][${this.j}]`, x+23, y+35);
  }
}
