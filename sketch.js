var labyrinth;
var labWidth = 5;
var labHeight = 5;
var cellPixelSize=48;
var myx = 2;
var myy = 0;

function Cell(i,j, left, top, right, bottom) {
  this.i = i;
  this.j = j;
  this.walls = [left, top, right, bottom]; //randomBoolean(), randomBoolean(), randomBoolean(), randomBoolean()];
}

function level1() {
    var walls = [
      /* top row */
      [{left:true, top:true, right:false, bottom:false},
      {left:false, top:true, right:false, bottom:true},
      {left:false, top:false, right:false, bottom:false},
      {left:false, top:true, right:true, bottom:false},
      {left:true, top:true, right: true, bottom:false}],
      /* 2nd row */
      [{left:true, top:false, right:true, bottom:false},
      {left:true, top:true, right:true, bottom:false},
      {left:true, top:false, right:true, bottom:false},
      {left:true, top:false, right:false, bottom:false},
      {left:false, top:false, right: true, bottom:true}],
      /* 3rd row */
      [{left:true, top:false, right:false, bottom:false},
      {left:false, top:false, right:true, bottom:true},
      {left:true, top:false, right:true, bottom:false},
      {left:true, top:false, right:false, bottom:true},
      {left:false, top:true, right:true, bottom:false}],
      /* 4th row */
      [{left:true, top:false, right:false, bottom:true},
      {left:false, top:true, right:true, bottom:false},
      {left:true, top:false, right:false, bottom:true},
      {left:false, top:true, right:true, bottom:false},
      {left:true, top:false, right:true, bottom:false}],
      /* 5th row */
      [{left:true, top:true, right:false, bottom:true},
      {left:false, top:false, right:true, bottom:true},
      {left:true, top:true, right:false, bottom:false},
      {left:false, top:false, right:true, bottom:true},
      {left:true, top:false, right:true, bottom:true}]
    ];
    labyrinth = new Array(labWidth);
    for (var i=0; i<labWidth; i++) {
      labyrinth[i] = new Array(labHeight);
      for (var j=0; j<labHeight; j++) {
        var wall = walls[j][i]; // j and i are inverted because we entered the data horizontally above
        //console.log("Creating "+i+","+j+"  "+wall.left+"-"+wall.top+"_"+wall.right+"_"+wall.bottom);
        labyrinth[i][j] = new Cell(i,j, wall.left, wall.top, wall.right, wall.bottom);
      }
    }
    return labyrinth;
}

function randomBoolean() {
  if (Math.random()<.5)
    return false;
  else {
    return true;
  }
}

function setup() {
  createCanvas(1600,800);
  /*labyrinth = new Array(labWidth);
  for (var i=0; i<labWidth; i++) {
    labyrinth[i] = new Array(labHeight);
    for (var j=0; j<labHeight; j++) {
      labyrinth[i][j] = new Cell(i,j);
    }
  }*/
  labyrinth = level1();
}
function drawLabyrinth() {
  for (var i=0; i<labWidth; i++) {
    for (var j=0; j<labHeight; j++) {
      var cell = labyrinth[i][j];
      var walls = cell.walls;
      //console.log("Cell "+i+","+j+" walls="+walls)
      var x = i*cellPixelSize;
      var y = j*cellPixelSize;
      if (walls[0]) { // left wall
        line(x,y,x,y+cellPixelSize);
      }
      if (walls[1]) { // top wall
        line(x,y,x+cellPixelSize,y);
      }
      if (walls[2]) { // right wall
        line(x+cellPixelSize,y,x+cellPixelSize,y+cellPixelSize);
      }
      if (walls[3]) { // bottom wall
        line(x,y+cellPixelSize,x+cellPixelSize,y+cellPixelSize);
      }
    }
  }
}

var canMove=true;
function keyReleased() {
  canMove=true;
}
function draw() {
  background(255);
  drawLabyrinth();
  var walls = labyrinth[myx][myy].walls;
  if (keyIsPressed && canMove) {
    canMove=false;
    console.log("Key: "+key+" Cell: "+myx+","+myy);
    if (key == 'w' && myy>=1 && walls[1]==false) { // up
      myy -= 1;
    }
    else if (key == 's' && myy<labHeight-1 && walls[3]==false) { // down
      myy += 1;
    }
    else if (key == 'a' && myx>=1 && walls[0]==false) { // left
      myx -= 1;
    }
    else if (key == 'd' && myx<labWidth-1 && walls[2]==false) { // right
      myx += 1;
    }
  }
  if (myx == 2 && myy == 4) {
    alert('You won!')
    myx = 2;
    myy = 0;
  }
  fill('orange');
  ellipse(myx*cellPixelSize+cellPixelSize/2, myy*cellPixelSize+cellPixelSize/2, cellPixelSize-10, cellPixelSize-10)
}
