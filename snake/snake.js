class Square{
  constructor(x,y, height, width, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }
}

var gameloop;
var tile;
var xv;
var yv;
var bwidth;
var bheight;
var cwidth;
var cheight;
var food;
var sheight;
var swidth;
var moveu = false;


window.onload = function startGame(){
  xv = 1;
  yv = 0;
  bwidth = 40;
  bheight = 30;
  canv = document.getElementById("gc");
  canvas = canv.getContext("2d");
  cheight = canv.height;
  cwidth = canv.width;
  swidth = canv.width/bwidth;
  sheight = canv.height/bheight;
  xrand = Math.floor(Math.random() * bwidth);
  yrand = Math.floor(Math.random() * bheight);
  food = new Square(xrand*swidth+1,yrand*sheight+1,swidth-2, sheight-2, "red");
  sq = new Square(1,1, swidth-2,sheight-2, "white")
  tile = [];
  console.log("oi");
  tile.push(sq);
  gameloop = setInterval(game, 1000/10);
  document.addEventListener("keydown", keyPush);
}

function keyPush(evt){
  console.log("oi");
  if(!moveu){
    moveu = true;
    if(evt.keyCode == 38){
      if(yv != 1){
        xv = 0;
        yv = -1;
      }
    }
    else if(evt.keyCode == 39){
      if(xv != -1){
        xv = 1;
        yv = 0;
      }
    }
    else if(evt.keyCode == 40){
      if(yv != -1){
        xv = 0;
        yv = 1;
      }
    }
    else if(evt.keyCode == 37){
      if(xv != 1){
        xv = -1;
        yv = 0;
      }
    }
  }

}

function getEmptyPosition(){
  var xr;
  var yr;
  var found = false;
  while(!found){
    xr = Math.floor(Math.random() * bwidth);
    yr = Math.floor(Math.random() * bheight);
    found = false;
    for(t of tile){
      if(t.x == food.x && t.y == food.y) found = true;
    }
  }
  arr = [];
  arr.push(xr);
  arr.push(yr);
  return arr;
}

function spawnNewFood(){
  pos = getEmptyPosition();
  food = new Square(pos[0]*swidth+1,pos[1]*sheight+1,swidth-2, sheight-2, "red");

}

function moveRestOfSnake(){
  for(let i = tile.length-1; i > 0; i--){
    tile[i].x = tile[i-1].x;
    tile[i].y = tile[i-1].y;

  }

}
function moveRestOfSnakeEating(){
  tmp = new Square(tile[tile.length-1].x,tile[tile.length-1].y,tile[tile.length-1].width,tile[tile.length-1].height,tile[tile.length-1].color);
  for(let i = tile.length-1; i > 0; i--){
    tile[i].x = tile[i-1].x;
    tile[i].y = tile[i-1].y;

  }
  tile.push(tmp);
}
function notEating(){
  isEating = false;
  if(tile[0].x == food.x && tile[0].y == food.y) isEating = true;

  return !isEating;
}

function drawEverything(){
  drawRect(food.x, food.y, food.width, food.height, food.color);
  for(let t of tile){
    drawRect(t.x, t.y, t.width, t.height, t.color);
  }
}

function moveHead(head){
  square = new Square(head.x, head.y, head.width, head.height, head.color);
  square.x += xv * (swidth);
  if(square.x < 0){
    square.x = cwidth+1-swidth;
  }
  else if(square.x > cwidth){
    square.x = 1;
  }
  square.y += yv * (sheight);
  if(square.y < 0){
    square.y = cheight+1-sheight;
  }
  else if(square.y > cheight){
    square.y = 1;
  }
  return square;
}
function crashed(){
  crash = false;
  for(let i = 1; i < tile.length; i++){
    if(tile[0].x == tile[i].x && tile[0].y == tile[i].y) crash = true;
  }
  return crash;
}
function game(){
  moveu = false;
  canvas.clearRect(0, 0, cwidth, cheight);
  drawEverything();
  if(notEating()){
    moveRestOfSnake();
    tile[0] = moveHead(tile[0]);
    if(crashed()){
      clearInterval(gameloop);
    }
  }
  else{
    spawnNewFood();
    moveRestOfSnakeEating();
    tile[0] = moveHead(tile[0]);
  }
}

function drawRect(x,y,width,height,color){
  c = document.getElementById("gc");
  canvas = c.getContext("2d");
  canvas.beginPath();
  canvas.lineWidth = 1;
  canvas.strokeStyle = color;
  canvas.rect(x,y,width,height);
  canvas.fillStyle = color;
  canvas.fill();
}
