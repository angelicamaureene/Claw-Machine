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
  "Romance is not dead if you keep it just yours - Paris, Taylor Swift - Even though we’re not public with everyone in our lives, I wouldn’t care less because it’s just as real even in secret",
  "I wanna transport you to somewhere the culture’s clever - Paris, Taylor Swift - I wanna be with you everywhere and anywhere, if it happens so that the place is beautiful, magical, and or at all whimsical, it’s just an added bonus, because your beauty is truly all that is needed",
  "And every time I look at you, it’s like the first time, I fell in love with a careless man’s careful daughter, she is the best thing that’s ever been mine - Mine, Taylor Swift - YOU, you truly are the best thing that’s ever been mine, and I promise to not be as careless as your father and to show care in a plethora of different ways to always assure you and never leave room for any doubts",
  "I can’t help but wish you took me with you, and this is when the feeling sinks in, I don’t wanna miss you like this. Come back, be here, come back be here - Come Back…Be Here, Taylor Swift - I know it was inevitable, but I just didn’t know it would ache this hard knowing you’re completely on the opposite side of the world from me. For now I’ll spend every second counting down to when I may see you again",
  "This is falling for you and you are worlds away. In New York, be here. But you’re in London, and I break down, cause it’s not fair that you’re not around- Come Back…Be Here, Taylor Swift - In this city is the last place anyone ever wants to be in, and I wouldn’t wish it on my worst enemy, but more than ever do I wish you come back to this god forsaken city",
  "Lovelorn and nobody knows, love thorns all over this rose - Slut, Taylor Swift - Our relationship is nobody business as much as people think they know of it and what of it, they simply just don’t, they never will. Only you and I will ever truly know our rose looks like",
  "I’m a mess, but I’m the mess that you wanted. Oh cause it’s gravity, oh keeping you with me - Dancing with our Hands Tied, Taylor Swift - Truly I am an utter mess, more than one could imagine, and you choosing me is unimaginable my love. For you I’ll spend forever cleaning in hopes that I can be deserving of you",
  "Long night with your hands up in my hair. Echoes of your footsteps on the stairs. Stay here, honey, I don’t wanna share - Delicate, Taylor Swift - Our birthday night (or I guess I shall say our birthday midnight), all the way to hearing our footsteps down your stairs along with Naia’s or even the same at my place with Sparkle’s, moments like those I wish and crave to last forever, but alas those are always the shortest",
  "And I can’t let you go your handprint’s on my soul. It’s like your eyes are liquor, it’s like your body is gold - End Game, Taylor Swift - You’ve made your mark on me literally and figuratively, and I could not be more happier. Your eyes have the ability to lure me in and have me addicted at first glance as if your the first sip to a Bellini, your body of gold, a true treasure that shall be cherished and adored",
  "And the voices that implore, “You should be doing more” to you, I can admit that I’m just too soft for all of it - Sweet Nothings, Taylor Swift - Whenever I feel as though the world asks more of me or from me, or if I’m not doing enough, you’re always there to remind me otherwise, and reassure me all is well. I could never thank you enough  for that my love, I want to be the same and give the same sense of a safety net for you and keep you warm in the world’s coldest",
  "All that you ever wanted from me was sweet nothing - Sweet Nothings, Taylor Swift - You want nothing more from me than the most simplest of things, and in response I’d rather say you deserve way more than just the bare minimum and you deserve everything in this world. But just telling you that is never enough, I want to prove it, everyday with more than just my words, and if I don’t hold me responsible for being a liar my love",
  "With you, I made a pact. I knew it when your comfort felt like love that lasts. And then you kissed my lips, I knew with that first kiss, I want to spend my life with you for eternity - Sweet Nothings, Denise Julia - This entire song is a whole message I want to share with you, so I nudge you to give it a listen.",
  "Let them be them, let us be us. Love is a maze, damn but you is amaze yeah - Love Maze, BTS - Gosh baby how do I even explain. I don’t care much for what people wanna say or do, all I know is at the end of the day all my care and attention will all just be consumed by you so anything other than you is simply irrelevant. You’re the true amazing thing in the world",
  "Because your laughter and happiness is the scale of my happiness - Her, BTS - It is baby, it truly is, simple and plain",
  "Every language that makes you is already in paradise - Paradise, BTS - I can speak three languages, but now more than ever the only language I want to be fluent in is your love language and how I can communicate with you in the way you desire and deserve",
  "Haven’t felt so divine till I looked in your eyes, I see my future, baby - Marilag, Dionela - One look into your hazel specs and I know, I know everything in my future has those specs in it",
  "You’ve turned my limbics into a bouquet - Sining, Dionela - What can I say my emotional nervous system is nothing but a bouquet when it comes to you, flowers and all you make it bloom like no other, you are the sun and water that feeds into it’s blooming",
  "Everybody thinks I’m lying when I say she’s mine cause she’s out of my league in every single way - Out of my league, Lany - Completely and utterly out of my league you stay being, I know, our friends know it, strangers at one glance know it, and you yourself must know too, but boy am I lucky. ",
  "You got me falling from the ceiling for ya. Knew right from the start there was no limit to ya. And I’m catching feelings, baby - Feels Kehlani - From the very beginning you really made me fall face plant for you, from the beginning of our dip I was so scared I’d drop you because of how drop dead gorgeous you looked from that view",
  "It’s the beat that my heart skips when I’m with you. But I still don’t understand just how your love can do what no one else can - Crazy in Love, Beyonce - I don’t even know how to explain it, I can just feel my heart pulsing out of my neck each time in such rhythmic beating that can’t even be described with words, and it comes from just the mere thoughts of you, your presence isn’t even needed, although with your presence it grows more alarmingly stronger",
  "There she goes racing though my brain, and I just can’t contain this feelin’ that remains - There she goes, The La’s - All you do is race in my head, so much so this song plays a loop in my head because it associates it with you",
  "You pierce my soul. I am half agony, half hope - Persuasion, Jane Austen - Especially during this time, I am full of agony and hope, much like despair and deprivation at just the mere lack of your presence within our city radius",
  "To be your friend was all I ever wanted; to be your lover was all I ever dreamed - Valerie Lombardo - From the very beginning you were a very desirable friend, cool, admirable, charming, funny, petite, now you are a bewitching lover all of the same traits just now all more visible and reach-able ",
  "To love is to admire with the heart; to admire is to love with the mind - Oscar Wilde - Mind and heart, all functions remains as one reason, and that reason is you, you are the driving force behind all the functions my body produces and facilitates",
  "You are all of my today and all of my tomorrows - Oscar Wilde - No matter the time, the situation, nor the place, it all remains the same that you are my present and my future for as long as you’ll have me",
  "You call it madness, but I call it love - Don Bays - I don’t care how crazy they see me as, for I know I wouldn’t be so crazy if it weren’t true, authentic and genuine",
  "You’re the cheese to my macaroni - Juno - Truly you’re the my matching half, may it be any version of the universe",
  "I love you more than coffee, but please don’t make me prove it - Elizabeth Evans - I’ve awoken from my sleep not with the first thought of coffee but with thoughts of you instead, and that truly does speak volumes",
  "If I had a flower for every time I thought of you… I could walk through my garden forever - Alfred Lord Tennyson - And even then the garden would never end, god forbid the earth could not even house such garden for it exceeds the capacity of earth it self, nay the entire universe",
  "Love is composed of a single soul inhabiting two bodies - Aristotle - You and I feel as though one soul separated for if we were too join together we’d be too powerful for his world",
  "I never want to stop making memories with you - Pierre Jeanty - I want to make so much memories with you, I don’t even know if there’s enough time in a lifetime for it",
  "I want to do with you what spring does with the cherry trees - Every Day You Play, Pablo Neruda - Bloom, all spring long",
  "I do love nothing in the world so well as you - Much Ado About Nothing, William Shakespeare - Nothing in the world could ever compare",
  "Every atom of your flesh is as dear to me as my own; in pain and sickness it would still be dear - Jane Eyre, Charlotte Bronte - So so very dear my love, it must be treated with absolute tender care and gentleness",
  "When you love you wish to do things for, You wish to sacrifice for. You wish to serve - A Farewell to Arm, Ernest Hemingway - For you, I must, I shall, nay I will, whatever it takes, whatever the stakes, whatever the cost",
  "I would not wish any companion in the world but you - The Tempest, William Shakespeare - You’re the only company I seek ",
  "There is no charm equal to tenderness of heart - Emma, Jane Austen - Though your charm does give me second thoughts about this argument",
  "You are my silence in a world that never stops talking - Sanober Khan - The world is loud, it’s only ever quiet amidst your presence",
  "With you, everything; without you, nothing - Amado Nero - Plain and simple,
  "Your eyes are my spell against a bad day - Mario Benedetti - Most bad days turn good at just the mere thought of you, so matter of fact everyday is a good day",
  "The soul that can speak with the eyes can also kiss with a gaze - Gustavo Adolfo Becquer - Your eyes speak to me as if they come from the depths of heaven, just from one gaze I sense that heaven has touched upon me",
 
];

/*  💫  Pool of emojis that appear on the balls  */
const EMOJIS = ["🎁","💖","🍬","🌟","🎈","🍭","💌","🎉","🧸","🪄"];

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
  closeBtn.addEventListener("click", () => {
  modal.close();

  /* If no balls left in cabinet, start a new round */
  if (balls.length === 0) {
    resetGame();
  }
});


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

    div.dataset.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
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
/* --------------------------------------------------------------
   RESET THE GAME once all balls have been collected
   -------------------------------------------------------------- */
function resetGame() {
  /* 1. Clear the bin */
  const bin = document.getElementById("bin");
  while (bin.firstChild) bin.removeChild(bin.firstChild);

  /* 2. Clear the playfield */
  while (ballArea.firstChild) ballArea.removeChild(ballArea.firstChild);

  /* 3. Reset message pool & ball list */
  availableMsgs = shuffle([...MESSAGES]);
  balls = [];

  /* 4. Spawn a brand‑new cabinet full of balls */
  spawnBalls();
}

/* Helpers ---------------------------------------------------------- */
function shuffle(arr) { for (let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }
const clamp=(n,min,max)=>Math.min(Math.max(n,min),max);


