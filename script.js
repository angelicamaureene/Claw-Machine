/***********************************************************************
 * Claw Machine – now spawns ONE ball per message so you can have 50‑100.
 * All balls are kept inside #ball-area (the main cabinet space).
 ***********************************************************************/

const CLAW_SPEED = 3;   // px‑per‑frame left‑right patrol
const DROP_SPEED = 4;   // px‑per‑frame drop / lift
const FRAME      = 16;  // ~60 fps

/*  ✍️  Put as many notes as you like – the script uses the full length. */
const MESSAGES = [
  "You make ordinary days magic ✨",
  "Somewhere, a love song is thinking of you.",
  "Keep this note for a rainy day ☔",
  /* … add up to 100+ here … */
  "This note thinks you're amazing."
];

const NUM_BALLS = MESSAGES.length;   // ← one ball per note

let rail, claw, ballArea, dropBtn, modal, msgTxt, closeBtn;
let dir = 1;          // patrol direction (1 = right, −1 = left)
let dropping = false;
let balls = [];       // active balls inside cabinet
let availableMsgs = [];

/* ---------------------------------------------------------------*/
window.addEventListener("DOMContentLoaded", init);

function init(){
  rail      = document.getElementById("rail");
  claw      = document.getElementById("claw");
  ballArea  = document.getElementById("ball-area");
  dropBtn   = document.getElementById("drop-btn");
  modal     = document.getElementById("msg-modal");
  msgTxt    = document.getElementById("msg-text");
  closeBtn  = document.getElementById("close-btn");

  dropBtn.addEventListener("click", dropClaw);
  closeBtn.addEventListener("click", ()=>modal.close());

  availableMsgs = shuffle([...MESSAGES]);  // fresh copy & shuffle
  spawnBalls();

  requestAnimationFrame(loop);
}

/* Create ball DOM elements & scatter inside #ball-area -----------*/
function spawnBalls(){
  const pad   = 6;                               // min gap to walls
  const w     = ballArea.clientWidth  - 40 - pad;
  const h     = ballArea.clientHeight - 40 - pad;

  for(let i=0;i<NUM_BALLS;i++){
    const div = document.createElement("div");
    div.className = `ball palette-${i%6}`;
    ballArea.appendChild(div);

    // random (non‑overlapping-ish) scatter
    const x = pad + Math.random()*w;
    const y = pad + Math.random()*h;

    div.style.left = `${x}px`;
    div.style.top  = `${y}px`;
    balls.push(div);
  }
}

/* Animation loop -------------------------------------------------*/
function loop(){
  patrolClaw();
  requestAnimationFrame(loop);
}

function patrolClaw(){
  if(dropping) return;

  let x = parseFloat(getComputedStyle(claw).left);
  x += CLAW_SPEED*dir;
  if(x<0||x>280){ dir*=-1; x=Math.max(0,Math.min(280,x)); }
  claw.style.left = x+"px";
}

/* Drop attempt ---------------------------------------------------*/
function dropClaw(){
  if(dropping) return;
  dropping = true;
  dropBtn.disabled = true;

  let y = 0;
  const interval = setInterval(()=>{
    y += DROP_SPEED;
    claw.style.top = y+"px";

    const caught = balls.find(b=>isColliding(claw,b));
    if(caught || y>ballArea.clientHeight-20){
      clearInterval(interval);
      if(caught) liftPrize(caught);
      else       resetClaw();
    }
  },FRAME);
}

/* Collision (rect‑circle approximation) --------------------------*/
function isColliding(rectEl,circEl){
  const r = rectEl.getBoundingClientRect();
  const c = circEl.getBoundingClientRect();

  const closestX = clamp(c.left+19, r.left, r.right);
  const closestY = clamp(c.top +19, r.top , r.bottom);

  const dx = closestX - (c.left+19);
  const dy = closestY - (c.top +19);

  return Math.hypot(dx,dy) < 20;
}

/* Lift up, drop to bin, reveal message ---------------------------*/
function liftPrize(ball){
  ball.style.pointerEvents="none";
  claw.appendChild(ball);
  ball.style.left="1px";
  ball.style.top ="38px";

  claw.style.top="0px";

  setTimeout(()=>{
    document.getElementById("bin").appendChild(ball);
    ball.style.left=`${Math.random()*240+20}px`;
    ball.style.top =`${Math.random()*10 + 4}px`;

    showMessage();

    balls = balls.filter(b=>b!==ball); // remove from active pool
    resetClaw();
  },600);
}

function showMessage(){
  if(availableMsgs.length===0) availableMsgs=shuffle([...MESSAGES]);
  msgTxt.textContent = availableMsgs.pop();
  modal.showModal();
}

function resetClaw(){
  claw.style.top="0px";
  dropping=false;
  dropBtn.disabled=false;
}

/* Helpers --------------------------------------------------------*/
function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
const clamp=(n,min,max)=>Math.min(Math.max(n,min),max);

