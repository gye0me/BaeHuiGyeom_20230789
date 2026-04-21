let px, py;
let pd = 60; // 플레이어의 위치와 크기

// 적의 위치와 크기
let dx = [100, 200, 300, 400, 500];
let dy = [150, 250, 100, 300, 200];
let dSize = 15;
let dActive = [true, true, true, true, true];

let score = 0;

function setup() {
  createCanvas(2816, 1536);
  px = width / 2;
  py = height / 2;
}

function draw() {
  background(0);

  // 맵 그리기
  drawMap();

  // 플레이어 그리기
  fill(255, 255, 0);
  strokeWeight(10);
  noStroke();
  ellipse(px, py, pd);

  // 플레이어 이동
  if(keyIsDown(LEFT_ARROW)) {
    px -= 5;
    fill (255, 255, 0);
    arc (px, py, pd, pd, PI + QUARTER_PI, TWO_PI + QUARTER_PI);
    isMoving = true;
  }
  if(keyIsDown(RIGHT_ARROW)) {
    px += 3;
    fill (255, 255, 0);
    arc (px, py, pd, pd, QUARTER_PI, PI + QUARTER_PI);
    isMoving = true;
  }
  if(keyIsDown(UP_ARROW)) {
    py -= 3;
    fill (255, 255, 0);
    arc (px, py, pd, pd, PI + QUARTER_PI, TWO_PI + QUARTER_PI);
    isMoving = true;  
  }
  if(keyIsDown(DOWN_ARROW)) {
    py += 3;
    fill (255, 255, 0);
    arc (px, py, pd, pd, QUARTER_PI, PI + QUARTER_PI);  
    isMoving = true;
  }

  if (!isMoving) {
    fill (255, 255, 0);
    arc (px, py, pd, pd);
  }
  // 점 먹기
  for(let i = 0; i < 5; i++) {
    if(dActive[i] == true) {
      fill(255, 0, 0);
      ellipse(dx[i], dy[i], dSize);
      
      let d = dist(px, py, dx[i], dy[i]);
      if(d < (pd + dSize) / 2) {
        dActive[i] = false;
        score = score + 1;
      }
    }
  }


    // 점수
      fill(255);
      textSize(50);
      text("점수: " + score, 50, 80);
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
    strokeWeight(5);
    noFill();

    rect(100, 100, 2616, 1336);
    line(100, 100, 2716, 100);
    line(100, 100, 100, 1436);

    line(100, 768, 2716, 768);
  
    rect(1200, 600, 400, 300);
    };

