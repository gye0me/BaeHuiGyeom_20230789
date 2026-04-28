let px, py;
let pd = 60; // 플레이어의 위치와 크기
let isMoving = false;
let dir = "RIGHT";
let eSpeed = 5; // 적의 속도

let ex = [500, 1000, 1500, 2000, 2500]; // 적의 위치
let ey = [500, 1000, 500, 1000, 500];
let eSize = 5;


let dx = [100, 200, 300, 400, 500];
let dy = [150, 250, 100, 300, 200];
let dSize = 30;
let dActive = [true, true, true, true, true];
let activeDotsCount = 0;

let score = 0;
let energy = 3;
let gameOver = false;
let gameWin = false;

function randomizeDots() {
  for(let i = 0; i < 5; i++) {
    dx[i] = random(100, 2700);
    dy[i] = random(100, 1400);
    dActive[i] = true;
  }
}

function setup() {
  createCanvas(2816, 1536);
  px = 200;
  py = 200;

  randomizeDots();
}

function draw() {
  background(0);
  isMoving = false;
  activeDotsCount = 0;


  if (!gameOver && !gameWin) {
    if(keyIsDown(LEFT_ARROW)) { if (!isHittingWall(px - 4, py)) px -= 4; isMoving = true; dir = "LEFT";}
    if(keyIsDown(RIGHT_ARROW)) { if (!isHittingWall(px + 4, py)) px += 4; isMoving = true; dir = "RIGHT";}
    if(keyIsDown(UP_ARROW)) { if (!isHittingWall(px, py - 4)) py -= 4; isMoving = true; dir = "UP";}
    if(keyIsDown(DOWN_ARROW)) {if (!isHittingWall(px, py + 4)) py += 4; isMoving = true; dir = "DOWN";}
  

  for(let i = 0; i < 5; i++) {
    fill(0, 0, 255);
    rect(ex[i], ey[i], 40, 40);
    ex[i] += random(-eSpeed, eSpeed);
    ey[i] += random(-eSpeed, eSpeed);

    let d =dist(px, py, ex[i], ey[i]);
    if (d < (pd + 40) / 2) {
      energy--;
      ex[i] = random(200, 2500);
      ey[i] = random(200, 1200);
      if (energy <= 0) gameOver = true;
    }
  }
}

  drawMap();

  fill(255, 255, 0);
  noStroke();
  if (isMoving) {
    if (dir == "RIGHT") {
      arc (px, py, pd, pd, 0.5, TWO_PI - 0.5);
    } else if (dir == "LEFT") {
      arc (px, py, pd, pd, PI + 0.5, PI - 0.5);
    } else if (dir == "UP") {
      arc (px, py, pd, pd, -HALF_PI + 0.5, -HALF_PI - 0.5);
    } else if (dir == "DOWN") {
      arc (px, py, pd, pd, HALF_PI + 0.5, HALF_PI - 0.5);
    }
  } else {
    ellipse(px, py, pd);
  }
  // 점 먹기
  for(let i = 0; i < 5; i++) {
    if(dActive[i] == true) {
      fill(255, 0, 0);
      ellipse(dx[i], dy[i], dSize);
      activeDotsCount++;
      
      let d = dist(px, py, dx[i], dy[i]);
      if(d < (pd + dSize) / 2) {
        dActive[i] = false;
        score = score + 10;
      }
    }
  }

  if (activeDotsCount == 0) gameWin = true;
    // 점수
  fill(255);
  textSize(70);
  text("점수: " + score, 20, 80);
  text("에너지: " + energy, 20, 180);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(120);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(60);
    text("R키를 누르세요", width / 2, height / 2 + 100);
  }

  if (gameWin) {
    fill(0, 255, 0);
    textSize(120);
    textAlign(CENTER);
    text("YOU WIN!", width / 2, height / 2);
    textSize(60);
    text("R키를 누르세요", width / 2, height / 2 + 100);
  }
  if (keyIsPressed && key == 'r') resetGame();
}

  for(let i = 0; i < 5; i++) {
    if(dActive[i] == true) {
      let d = dist(px, py, dx[i], dy[i]);
      if(d < (pd + dSize) / 2) {
        energy--;
        dActive[i] = false;
        if (energy <= 0) {
          gameOver = true;
        }
      }
    }
  }


    
  

function randomizeDots() {
  for(let i = 0; i < 5; i++) {
    dx[i] = random(200, 2500);
    dy[i] = random(200, 1200);
    dActive[i] = true;
  }
}



  function drawMap() {
    stroke(0, 200, 400);
    strokeWeight(9);
    noFill();

    line(410, 50, 2516, 50); //외곽 상단
    line(2516, 50, 2516, 488);
    line(2516, 488, 2316, 488);

    line(50, 768, 500, 768); // 복도
    line(2316, 768, 2816, 768); 
    line(50, 668, 500, 668);
    line(2316, 668, 2816, 668);

    rect(1218, 630, 380, 200); // 중앙 벽


    }

    function isHittingWall(nx, ny) {
      let r = (pd / 20) + 3;
      if (nx - r < 100 || nx + r > 2716 || ny - r < 100 || ny + r > 1436) return true;
      if (nx + r > 1200 && nx - r < 1600 && ny + r > 600 && ny - r < 900) return true;
      if (nx + r > 300 && nx - r < 700 && ny + r > 300 && ny - r < 500)  return true;
      if (nx + r > 2100 && nx - r < 2500 && ny + r > 300 && ny - r < 500) return true;
      return false;
    }
    
    function resetGame() {
      px = 200;
      py = 200;
      score = 0;
      energy = 3;
      gameOver = false;
      gameWin = false;
      dir = "RIGHT";
      for(let i = 0; i < 5; i++) {
        dActive[i] = true;
      }
    };
    
