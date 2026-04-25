let px, py;
let pd = 60; // 플레이어의 위치와 크기
let isMoving = false;
let dir = "RIGHT";

// 적의 위치와 크기
let dx = [100, 200, 300, 400, 500];
let dy = [150, 250, 100, 300, 200];
let dSize = 28;
let dActive = [true, true, true, true, true];

let score = 0;
let energy = 3;
let gameOver = false;
let gameWin = false;

function setup() {
  createCanvas(2816, 1536);
  px = 200;
  py = 200;
}

function draw() {
  background(0);
  isMoving = false;


  if (!gameOver && !gameWin) {
    if(keyIsDown(LEFT_ARROW)) {
      if (isHittingWall(px - 4, py)) {
        px -= 4;  
    }
      isMoving = true;
      dir = "LEFT";
    }
    if(keyIsDown(RIGHT_ARROW)) {
      if (isHittingWall(px + 4, py)) {
        px += 4; 
      }
      isMoving = true;
      dir = "RIGHT";
    }
    if(keyIsDown(UP_ARROW)) {
      if (isHittingWall(px, py - 4)) {
        py -= 4; 
      }
      isMoving = true;
      dir = "UP";
    }
    if(keyIsDown(DOWN_ARROW)) {
      if (isHittingWall(px, py + 4)) {
        py += 4; 
      }
      isMoving = true;
      dir = "DOWN";
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

  if (activeDotsCount == 0) {
    gameWin = true;
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


    // 점수
      fill(255);
      textSize(80);
      text("점수: " + score, 50, 80);
      text("에너지: " + energy, 50, 180);

    
  if (gameOver) {
    fill(255, 0, 0);
    textSize(120);
    textAlign(CENTER);
    text("GAME OvER", width / 2, height / 2);
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

  textAlign(LEFT);

  if (keyIsPressed && key == 'r') {
    resetGame();
  }
}

    
    // 벽과 충돌 처리
    let wallX = 1200;
    if (px + pd/2 < wallX) {
      px += 5;
    } else if (px - pd/2 > wallX + 400) {
      px -= 5;
    }

    function drawMap() {
    stroke(0, 200, 400);
    strokeWeight(9);
    noFill();

    rect(100, 100, 2616, 1336); // 가장 바깥
    
    rect(1200, 600, 400, 300); // 중앙 박스

    rect (300, 300, 400, 200); // 왼쪽 박스
    rect (2100, 300, 400, 200); // 오른쪽 박스

    rect (300, 1000, 400, 200); // 왼쪽 아래 박스
    rect (2000, 1000, 400, 200); // 오른쪽 아래 박스

    line (1400, 100, 1400, 400); // 상단 중앙
    line (1400, 1100, 1400, 1436); // 하단 중앙

    line(100, 100, 2716, 100);
    line(100, 100, 100, 1436);

    line(100, 768, 2716, 768);
  
    rect(1200, 600, 400, 300);
    }

    function isHittingWall(nx, ny) {
      let r = (pd / 20) + 3;
      if (nx - r < 100 || nx + r > 2716 || ny - r < 100 || ny + r > 1436) {
        return false;
      }
      if (nx + r > 1200 && nx - r < 1600 && ny + r > 600 && ny - r < 900) {
        return false;
      }
      if (nx + r > 300 && nx - r < 700 && ny + r > 300 && ny - r < 500) {
        return false;
      }
      if (nx + r > 2100 && nx - r < 2500 && ny + r > 300 && ny - r < 500) {
        return false;
      }

      return true;
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
    

