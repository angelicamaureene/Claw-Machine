/***********************************************************************
 *  Claw Machine – minimal, winnable, endlessly replayable.
 *  Mechanics kept simple on purpose – tweak numbers to taste!
 ***********************************************************************/

const NUM_BALLS = 6;          // keep small so success is easy
const CLAW_SPEED = 3;         // px per frame (left‑right patrol)
const DROP_SPEED = 4;         // px per frame when dropping
const FRAME = 16;             // ~60 fps

// 50 curated notes (add / edit freely)
const MESSAGES = [
  "You make ordinary days magic ✨",
  "Somewhere, a love song is thinking of you.",
  "Keep this note for a rainy day ☔",
  "You have the most disarming smile 😊",
  "Your kindness echoes louder than thunder.",
  "You + coffee = my perfect morning ☕",
  "You're a plot twist I never saw coming.",
  "Every star envies how you shine.",
  "You’re my favourite notification 🔔",
  "I’d share my fries with you 🍟",
  "Your laugh is my new ringtone.",
  "I love how you say my name.",
  "Adventure is better by your side.",
  "You turn doubts into confetti 🎉",
  "Even Wi‑Fi feels stronger around you.",
  "You are somebody’s ‘why not?’",
  "Your heart has great taste.",
  "My phone cheers when you text.",
  "You’re the reason for extra fries.",
  "If hugs were snowflakes, I'd send a blizzard.",
  "Netflix called – it wants you to stay.",
  "You're what playlists are written about.",
  "Sunsets compete with your vibe.",
  "You’re the plot I ship.",
  "You make awkward adorable.",
  "Your ideas bend galaxies.",
  "You generate bonus serotonin.",
  "Cats would write songs about you 🐾",
  "Your courage is contagious.",
  "Clouds hurry so you get sunlight.",
  "You make detours a destination.",
  "I like how you human.",
  "You’re colour in a grayscale world.",
  "Your quiet is loud enough.",
  "Kindness follows you like a cape.",
  "You emoji my day 😊",
  "Your words plant gardens.",
  "You deserve spontaneous applause.",
  "The moon texts you for advice.",
  "Coffee shops want to be you.",
  "You redefine déjà vu.",
  "Mirrors wish they reflected your vibe.",
  "You upgrade oxygen.",
  "You radiate plot armour.",
  "Waves break just to applaud you.",
  "You have premium gravity.",
  "Even Monday looks for your approval.",
  "Paper planes dream of flying like you.",
  "Your ordinary is extraordinary.",
  "This note thinks you're amazing."
];

let rail, claw, ballArea, dropBtn, modal, msgTxt, closeBtn;
let dir = 1;             // patrol direction (1 = right, -1 = left)
let dropping = false;
let balls = [];          // DOM nodes
let availableMsgs = [];

/* ------------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", init);

function init() {
  rail      = document.getElementById("rail");
  claw      = document.getElementById("claw");
  ballArea  = document.getElementById("ball-area");
  dropBtn   = document.getElementById("drop-btn");
  modal     = document.getElementById("msg-modal");
  msgTxt    = document.getElementById("msg-text");
  closeBtn  = document.getElementById("close-btn");

  dropBtn.addEventListener("click", dropClaw);
  closeBtn.addEventListener("click", () => modal.close());

  availableMsgs = shuffle([...MESSAGES]);   // fresh copy & shuffle
  spawnBalls();

  requestAnimationFrame(loop);
}

/* Create ball DOM elements & random positions ---------------------- */
function spawnBalls() {
  const pad = 8, areaW = 300, areaH = 280, cols = 3;
  const cellW = areaW / cols, cellH = areaH / Math.ceil(NUM_BALLS / cols);

  for (let i = 0; i < NUM_BALLS; i++) {
    const div = document.createElement("div");
    div.className = `ball palette-${i % 6}`;
    ballArea.appendChild(div);

    const col = i % cols;
    const row = Math.floor(i / cols);
    const x   = pad + col * cellW + Math.random() * (cellW - 40 - pad * 2);
    const y   = 80 + row * cellH + Math.random() * (cellH - 40 - pad * 2);

    div.style.left = `${x}px`;
    div.style.top  = `${y}px`;
    balls.push(div);
  }
}

/* Animation loop --------------------------------------------------- */
function loop() {
  patrolClaw();
  requestAnimationFrame(loop);
}

function patrolClaw() {
  if (dropping) return;

  let x = parseFloat(getComputedStyle(claw).left);
  x += CLAW_SPEED * dir;
  if (x < 0 || x > 280) { dir *= -1; x = Math.max(0, Math.min(280, x)); }

  claw.style.left = x + "px";
}

/* Drop attempt ----------------------------------------------------- */
function dropClaw() {
  if (dropping) return;

  dropping = true;
  dropBtn.disabled = true;

  const clawStartY = 0;
  let y = clawStartY;

  const interval = setInterval(() => {
    y += DROP_SPEED;
    claw.style.top = y + "px";

    // collision check
    const caught = balls.find(ball => isColliding(claw, ball));
    if (caught || y > 320) {
      clearInterval(interval);
      if (caught) {
        liftPrize(caught);
      } else {
        resetClaw();
      }
    }
  }, FRAME);
}

/* Collision (rect‑circle approximation) ---------------------------- */
function isColliding(rectEl, circEl) {
  const r = rectEl.getBoundingClientRect();
  const c = circEl.getBoundingClientRect();

  const closestX = clamp(c.left + 19, r.left, r.right);
  const closestY = clamp(c.top + 19, r.top,  r.bottom);

  const dx = closestX - (c.left + 19);
  const dy = closestY - (c.top  + 19);

  return Math.hypot(dx, dy) < 20;  // 20 ≈ radius
}

/* Lift up, drop to bin, reveal message ----------------------------- */
function liftPrize(ball) {
  // attach ball to claw
  ball.style.pointerEvents = "none";
  claw.appendChild(ball);
  ball.style.left = "1px"; ball.style.top = "38px";

  // move up
  claw.style.top = "0px";

  setTimeout(() => {
    // drop prize into bin
    const bin = document.getElementById("bin");
    bin.appendChild(ball);
    ball.style.left = `${Math.random() * 240 + 20}px`;
    ball.style.top  = `${Math.random() * 10 + 4}px`;

    // show note ✉️
    showMessage();

    // Remove ball from active pool so next run is still winnable
    balls = balls.filter(b => b !== ball);

    resetClaw();
  }, 600);
}

function showMessage() {
  if (availableMsgs.length === 0) availableMsgs = shuffle([...MESSAGES]);

  msgTxt.textContent = availableMsgs.pop();
  modal.showModal();
}

function resetClaw() {
  claw.style.top = "0px";
  dropping = false;
  dropBtn.disabled = false;
}

/* Helpers ---------------------------------------------------------- */
function shuffle(arr) { for (let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
const clamp=(n,min,max)=>Math.min(Math.max(n,min),max);


