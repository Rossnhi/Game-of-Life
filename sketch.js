let gridScale = 5;
let row;
let col;
let run = false;
let board = [];
let boardCopy = [];
let runButton;

function setup() {
  createCanvas(600, 600);
  background(235);
  row = height/gridScale;
  col = width/gridScale;
  
  runButton = createButton("Run/Stop");
  runButton.position(width,0);
  runButton.mousePressed(toggleRun);
  
  clearButton = createButton("Clear");
  clearButton.position(width,25);
  clearButton.mousePressed(clearScreen);

  randomButton = createButton("Random");
  randomButton.position(width, 50);
  randomButton.mousePressed(randomPattern);
  
  
  for (let i = 0; i < col; i++){
    board.push([]);
    for (let j = 0; j < row; j++){
      board[i].push(0);
    }
  }
  
}

function draw() {
  frameRate(10);
  background(235);
  drawGrid();
  drawBoard();
  if (run == false){
    highLight();
  }
  else {
    updateBoard();
  }
}
function updateBoard(){
  let boardCopy = [];
  for (let i = 0; i < col; i++){
    boardCopy.push([]);
  }
  let alive;
  for (let i = 0; i < col; i++){
    for (let j = 0; j < row; j++){
      if (j < row - 1 && board[i][j+1] == 1){
        boardCopy[i][j] = 1;
      } 
      else{
        alive = liveNeighbours(i,j);
        if (board[i][j] == 1){
          if (alive < 2 || alive > 3){
            boardCopy[i][j] = 0;
          }
          else{
            boardCopy[i][j] = board[i][j];
          }

        }
        else{
          if ( alive == 3 ){
            boardCopy[i][j] = 1;
          }
          else{
            boardCopy[i][j] = board[i][j];
          }
        }
      }
    }
  }
  board = boardCopy;
}
function drawBoard(){
  for (let i = 0; i < col; i++){
    for (let j = 0; j < row; j++){
      if (board[i][j] == 1){
        fill(0)
        rect(i * gridScale, j * gridScale, gridScale, gridScale);
      }
    }
  }
}
function highLight(){
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
    fill(100, 200);
    rect(Math.floor(mouseX/gridScale) * gridScale, Math.floor(mouseY/gridScale) * gridScale, gridScale, gridScale);
  }
}
function drawGrid(){
  for (let i = 1; i < col; i++){
    line(i * gridScale, 0, i * gridScale, height);
  }
  for (let j = 1; j < row; j++){
    line(0, j * gridScale, width, j * gridScale);
  }
}
function mousePressed(){
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 && run == false){
    board[Math.floor(mouseX/gridScale)][Math.floor(mouseY/gridScale)] = !(board[Math.floor(mouseX/gridScale)][Math.floor(mouseY/gridScale)]);
  }
}
function toggleRun(){
  run = !(run);
  //runButton.style('background-color', color(((1-run) * 255) + (run * 120)));
}
function clearScreen(){
  for (let i = 0; i < col; i++){
    for (let j = 0; j < row; j++){
      board[i][j] = 0;
    }
  }
  run = false;
}
function liveNeighbours(i, j){
  let live = 0;
      
      if ( i + 1 < col){ 
        live += board[i+1][j];
      }
      if ( i - 1 >= 0){ 
        live += board[i-1][j];
      }
      if ( j + 1 < row){ 
        live += board[i][j + 1];
      }
      if ( j - 1 >= 0){ 
        live += board[i][j - 1];
      }
      if ( i + 1 < col && j + 1 < row){ 
        live += board[i + 1][j + 1];
      }
      if ( i - 1 >= 0 && j - 1 >= 0){ 
        live += board[i - 1][j - 1];
      }
      if ( i + 1 < col && j - 1 >= 0){ 
        live += board[i + 1][j - 1];
      }
      if ( i - 1 >= 0 && j + 1 < row){ 
        live += board[i - 1][j + 1];
      }
  return(live);
}
function randomPattern(){
  run = false;
  for (let i = 0; i < col; i++){
    for (let j = 0; j < row; j++){
      board[i][j] = random([0,1]);
    }
  }
}
