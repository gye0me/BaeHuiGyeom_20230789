let px, py;
let pd = 57; // 플레이어 크기
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

    // 외곽 상단
    line(355, 50, 2461, 50);
    
    // 왼쪽 상단 ㄴ자 공간
    line(355, 50, 355, 528);
    line(355, 528, 555, 528);

    // 오른쪽 상단 ㄴ자 공간
    line(2461, 50, 2461, 528);
    line(2461, 528, 2261, 528);

    // 통로 상단 이음 벽
    line(555, 528, 555, 668); 
    line(2261, 528, 2261, 668);

    // 왼쪽 통로
    line(0, 820, 555, 820);
    line(0, 668, 555, 668);

    // 오른쪽 통로
    line(2261, 820, 2816, 820);
    line(2261, 668, 2816, 668);

    // 외관 하단
    line(355, 1436, 2461, 1436);
  
    // 왼쪽 하단 ㄴ자 공간
    line(555, 968, 355, 968);
    line(355, 1436, 355, 968);
  
    // 오른쪽 하단 ㄴ자 공간
    line(2461, 1436, 2461, 968);
    line(2461, 968, 2261, 968);

    // 통로 하단 이음 벽
    line(555, 968, 555, 820);
    line(2261, 968, 2261, 820);


    // 중앙 사각 공간
    line(1218, 868, 1598, 868);
    line(1218, 668, 1218, 868);
    line(1598, 668, 1598, 868);
    line(1218, 668, 1345, 668);
    line(1471, 668, 1598, 668);

    // 중앙 위 T자 공간
    line(1218, 400, 1598, 400);
    line(1598, 400, 1598, 440);
    line(1218, 400, 1218, 440);
    line(1218, 440, 1365, 440);
    line(1451, 440, 1598, 440);
    line(1365, 440, 1365, 530);
    line(1451, 440, 1451, 530);
    line(1365, 530, 1451, 530);

    // 중앙 밑 T자
    line(1218, 1000, 1598, 1000);
    line(1598, 1000, 1598, 1040);
    line(1218, 1000, 1218, 1040);

    line(1218, 1040, 1393, 1040);
    line(1423, 1040, 1598, 1040);

    line(1393, 1040, 1393, 1180);
    line(1423, 1040, 1423, 1180);
    line(1393, 1180, 1423, 1180);

    //
    rect()
    
    // 중앙 상단 사각 공간
    line(1388, 50, 1388, 250);
    line(1438, 50, 1438, 250);
    line(1388, 250, 1438, 250);

    // 양쪽 중앙 사각
    rect(1870, 668, 130, 175);
    rect(1828, 668, 40, 175);

    rect(920, 668, 40, 175);
    rect(788, 668, 130, 175);

    // line (1000, 530, 1098, 530); //십자가 그리기 위한 선

    // 십자가 밑 사각
    rect(1080, 900, 40, 160);
    rect(1700, 900, 40, 160);

    //
    rect (700, 1000, 250, 40);

    // 상단 양쪽 긴 사각형
    rect(780, 160, 480, 100);
    rect(1560, 160, 480, 100);

    // 상단 양쪽 짧은 사각형 
    rect(2180, 160, 150, 100);
    rect(486, 160, 150, 100);

    // 상단 양쪽 작고 긴 사각형
    rect (486, 355, 150, 40);
    rect (2180, 355, 150, 40);


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
    
