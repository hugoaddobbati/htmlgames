class Point{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
class Tetromino{
  constructor(points){
    this.points = points;
  }
  rotateClockwise(){
    for(let i = 1; i < this.points.length; i++){

      this.points[i].x -= this.points[0].x;
      this.points[i].y -= this.points[0].y;
      let tmp = this.points[i].x;
      this.points[i].x = this.points[i].y;
      this.points[i].y = -tmp;
      this.points[i].x += this.points[0].x;
      this.points[i].y += this.points[0].y;

    }
  }
  moveBaixo(){
    for(let i = 0; i < this.points.length; i++){
      this.points[i].y++;
    }
  }
  moveEsquerda(){
    for(let i = 0; i < this.points.length; i++){
      this.points[i].x--;
    }
  }
  moveDireita(){
    for(let i = 0; i < this.points.length; i++){
      this.points[i].x++;
    }
  }
}

function generateTetromino(){
  tetrominoType = Math.floor(Math.random()*7)+1
  if(tetrominoType == 1){//GEN
    color = "red";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(5,0,color);
    ponto3 = new Point(6,1,color);
    ponto4 = new Point(4,1,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 2){ //GENERATE Z
    color = "blue";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(5,0,color);
    ponto3 = new Point(6,1,color);
    ponto4 = new Point(6,2,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 3){ //GENERATE I
    color = "purple";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(5,0,color);
    ponto3 = new Point(5,2,color);
    ponto4 = new Point(5,3,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 4){ //GENERATE J
    color = "green";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(6,1,color);
    ponto3 = new Point(4,1,color);
    ponto4 = new Point(6,0,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 5){ //GENERATE L
    color = "grey";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(5,0,color);
    ponto3 = new Point(5,2,color);
    ponto4 = new Point(6,0,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 6){ //GENERATE S
    color = "white";
    ponto1 = new Point(5,1,color);
    ponto2 = new Point(5,0,color);
    ponto3 = new Point(6,1,color);
    ponto4 = new Point(4,0,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
  else if(tetrominoType == 7){ //GENERATE O
    color = "yellow";
    ponto1 = new Point(5,0,color);
    ponto2 = new Point(5,1,color);
    ponto3 = new Point(4,1,color);
    ponto4 = new Point(4,0,color);
    tetromino = new Tetromino([ponto1,ponto2,ponto3,ponto4]);
    return tetromino;
  }
}

var currentTetromino;
var activePoints;
var canvas;
var cHeight;
var cWidth;
var bHeight;
var bWidth;


window.onload = function startGame(){
  activePoints = [];
  canv = document.getElementById("gc");
  canvas = canv.getContext("2d");
  cHeight =  canv.height;
  cWidth = canv.width;
  bHeight = 40;
  bWidth = 40;
  activePoints = [];
  currentTetromino = generateTetromino();
  document.addEventListener("keydown", keyPush);
  drawEverything();
  setInterval(game, 1000/2);
}

function isValidMovement(){
  isValid = true;
  for(p1 of currentTetromino.points){
    if((p1.x < 0 || p1.x >= cWidth/bWidth) || (p1.y < 0 || p1.y >= cHeight/bHeight)) isValid = false;
    for(point of activePoints){
      if(p1.x == point.x && p1.y == point.y) isValid = false;
    }
  }
  return isValid;
}

function keyPush(evt){
  backup = new Tetromino([new Point(currentTetromino.points[0].x,currentTetromino.points[0].y,currentTetromino.points[0].color),
                          new Point(currentTetromino.points[1].x,currentTetromino.points[1].y,currentTetromino.points[1].color),
                          new Point(currentTetromino.points[2].x,currentTetromino.points[2].y,currentTetromino.points[2].color),
                          new Point(currentTetromino.points[3].x,currentTetromino.points[3].y,currentTetromino.points[3].color)]);
  if(evt.keyCode == "40"){
    currentTetromino.moveBaixo();
  }
  else if(evt.keyCode == "37"){
    currentTetromino.moveEsquerda();
  }
  else if(evt.keyCode == "39"){
    currentTetromino.moveDireita();
  }
  else if(evt.keyCode == "38"){
    currentTetromino.rotateClockwise();
  }
  if(!isValidMovement()) currentTetromino = backup;
  canvas.clearRect(0, 0, cWidth, cHeight);
  drawEverything();
}

function drawRect(x,y,width,height,color){
  canvas.beginPath();
  canvas.lineWidth = 1;
  canvas.strokeStyle = color;
  canvas.rect(x,y,width,height);
  canvas.fillStyle = color;
  canvas.fill();
}

function drawEverything(){
  for(point of activePoints){
    drawRect(point.x*bWidth+1, point.y*bHeight+1, bWidth-2, bHeight-2 ,point.color);
  }
  for(point of currentTetromino.points){
    drawRect(point.x*bWidth+1, point.y*bHeight+1, bWidth-2, bHeight-2 ,point.color);
  }
}

function tryClearLine(){
  count = [];
  for(let i = 0; i < cHeight/bHeight; i++){
    count.push(0);
  }
  for(point of activePoints){
    count[point.y]++;
  }
  console.log(count);
  for(let i = 0; i < count.length; i++){
    if(count[i] == cWidth/bWidth){ clearLine(i); console.log(20-i-1)};
  }
}


function clearLine(line){
  console.log("?");
  newActivePoints = [];
  for(point of activePoints){
    if(point.y != line){
      if(point.y < line){
        point.y += 1;
      }
      newActivePoints.push(point);
    }

  }
  activePoints = newActivePoints;
}

function game(){
  backup = new Tetromino([new Point(currentTetromino.points[0].x,currentTetromino.points[0].y,currentTetromino.points[0].color),
                          new Point(currentTetromino.points[1].x,currentTetromino.points[1].y,currentTetromino.points[1].color),
                          new Point(currentTetromino.points[2].x,currentTetromino.points[2].y,currentTetromino.points[2].color),
                          new Point(currentTetromino.points[3].x,currentTetromino.points[3].y,currentTetromino.points[3].color)]);
  canvas.clearRect(0, 0, cWidth, cHeight);
  currentTetromino.moveBaixo();
  if(!isValidMovement()){
    currentTetromino = backup;
    currentTetromino.points.map(e => activePoints.push(e));
    currentTetromino = generateTetromino();
    tryClearLine();
  }
  drawEverything();
}
