let time;
let lastTick;
let clockRunning;
let gameClock;
let scollp;

let score = [0, 0];

let quarterText = ["1st", "2nd", "3rd", "4th"];

function startGame(x, y, w, h) {
  sb = 2;
  time = 0;
  lastTick = Date.now();
  clockRunning = true;
  gameClock = 40;
  scrollp=-0.15;
}

function drawClock(x, y, w, h) {
  let quarter = time / 300000 >> 0;
  if(quarter > 3) {
    sb = 0;
  }
  let clock = 300000 - (time % 300000);
  if(gameClock < 0) {
    gameClock = 40;
  }

  ctx.textAlign = 'left';
  ctx.font = `${(w*0.022)>>0}px sans-serif`;

  ctx.fillStyle = '#fff';
  ctx.fillText(`${clock/60000>>0}:` + `${(clock/1000>>0)%60}`.padStart(2, 0), x + w * 0.7, y + h * 0.1);
  ctx.fillText(quarterText[quarter], x + w * 0.645, y + h * 0.1);

  ctx.fillStyle = '#000';
  ctx.fillText(`2nd & 7`, x + w * 0.27, y + h * 0.1);
  ctx.fillText(':' + ('' + (gameClock >> 0)).padStart(2, 0), x + w * 0.76, y + h * 0.1);

  ctx.textAlign = 'center'
  ctx.fillStyle = '#fff';
  ctx.fillText(score[0], x + w * 0.485, y + h * 0.1);
  ctx.fillText(score[1], x + w * 0.616, y + h * 0.1);
}

function drawgame(x, y, w, h) {
  ctx.drawImage(field, x-w*0.225, y-w*1.5*908/641/2+scrollp*(w*1.5*908/641)+h/2, w*1.5, w*1.5*908/641);
  ctx.drawImage(board, x, y, w, h);
  let newTick = Date.now();
  if(clockRunning) {
    time += newTick - lastTick;
    gameClock -= (newTick - lastTick) / 1000;
  }
  lastTick = newTick;

  drawClock(x, y, w, h);
}

function s1() {
  callWithinAR(0, 0, w, h, 16 / 9, drawgame);
}
