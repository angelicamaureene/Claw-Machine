/***********************************************************************
 *  Claw Machine – minimal, winnable, endlessly replayable.
 *  Mechanics kept simple on purpose – tweak numbers to taste!
 ***********************************************************************/

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
  "With you, everything; without you, nothing - Amado Nero - Plain and simple",
  "Your eyes are my spell against a bad day - Mario Benedetti - Most bad days turn good at just the mere thought of you, so matter of fact everyday is a good day",
  "The soul that can speak with the eyes can also kiss with a gaze - Gustavo Adolfo Becquer - Your eyes speak to me as if they come from the depths of heaven, just from one gaze I sense that heaven has touched upon me",
  "There was a smile on her face that made me feel I had said something extraordinary. And in that moment, I believed I had - Tender is the Night, F. Scott Fitzgerald - The eyes you give me whenever I had say anything makes me feel as though I just discovered a new element when I all I said was probably the most stupidest thing ever, not only that but you remember everything, that’s just so silly of you",
  "Always, I want to write you, kiss you, ache toward you - Vita, 1927 - More than that I want to draw you, feel you, embrace you, and cherish you, I want to know every inch of you, know you more than I know the back of my own hand",
  "Your sweet voice - my heart groans with longing when I hear it - Fragment 88, Sapho - All I can do is quiver at excitement whenever I hear your voice, then when trying to replicate it in my head I can’t help but get goosebumps, but it can never compare to the real thing",
  "You have made me of a sea that waits for you shore - Renee Vivien - Patiently I will wait for your presences to wash over me as the roaring seas turn gentle and soft as the shores, I shall wait cold  and vast till you pull me in out of the sea and into your shallow tides",
  "She wanted to climb inside me, and I wanted to climb inside her - Elena Ferrante, My Brilliant Friend - For all our jokes and my insistence of a zipper, I can’t help but wish it were true so I can just crawl into you and be with you wherever you go",
  "It’s like in that moment the whole universe existed just to bring us together - Serendipity - Wasn’t the universe just so kind to have brought you to me, or was I just so darn lucky like that",
  "If you’re lucky enough to find a weirdo, never let them go - Modern Family - You’re my weirdo, and I don’t plan on letting you go anytime soon",
  "I think you’re the type of person who could change someone’s life just by being in it - Heartstopper - You are baby, you truly are, you’ve changed my life for the better and I know for a fact you’ve done it for others as well",
  "No matter how far apart we are, I’ll always come back to you - Weathering with You - Mhm, where you are in the world if you can’t get to me, I’ll get to you, no motion sickness will get in my way of getting to you, I’ll endure any types of transportation to get to you",
  "It feels like I’ve known you forever - maybe in another life - Eternal Sunshine of the Spotless Mind - Perchance that is why our connection is so strong, but if such case is true, I’ve been lucky not only in this timeline but in a previous one as well",
  "I see you in every quiet moment - Our Beloved Summer - Anytime I catch some peace and quiet, my head instantly goes towards thoughts of you",
  "When I’m with you I remember how to smile - Toradora - Cannot believe the amount of reminders I receive to smile, but when I’m with you, it all just comes natural",
  "I want to be the person you can’t stop thinking about - Normal People, Sally Rooney - More than anything I just wish to be a passing thought in your head, not to occupy every single space, but just the tiniest of space that doesn’t require much energy",
  "You make it impossible not to feel - Bridgerton S1 - The feelings you give me need to studied in a lab or something because I swear they are so indescribable that they probably don’t even exist yet, truly I think you invented new feelings within me, and I personally cannot get enough",
  "Love is not a weakness, it is a gift - Bridgerton - Truly a one of a kind gift it is. A gift I could not be more grateful for, you yourself is a gift, a gift I’m completely undeserving of and yet here you are",
  "You are the one who makes it impossible to look away - Bridgerton S2 - Baby, you command the eyes of everyone in the room with you. I know from personal experience, once my eyes lay on you I can’t help but stare and when out in public I can’t even look at you once because it only takes one glance and I’m glued forever you don’t even understand",
  "You are my heart, and even when my mind is lost, my heart knows you - Queen Charlotte - Sometimes I lose all thoughts and zone out, but the only thing that remains is thoughts of you and the space you occupy within my heart",
  "I cannot breathe when you are not near, my heart calls for your name - Queen Charlotte - For someone who is asthmatic you really do take my breath away, I think I need to invest in my puffer again. When you are not near I can’t help but feel my throat restrict itself as if it’s just a bodily reaction towards your lacking presence, causing my heart to call for you all the time",
  "There were no words. There was only the look - The Duke and I - Sometimes we don’t need words to convey what we feel, I can just stare at your eyes and already know everything we want to share",
  "He found her hand, and when their fingers touched, it felt like home - An Offer from a Gentleman - I love your hands, my hands search for yours even when you’re not near, the soft and tenderness they exude, once parted, my hands no longer hold meaning, I just wait till I can hold yours again and kiss them senseless",
  "It’s not like in the movies. It’s better, because it’s real - To All the Boys I’ve Loved Before - That’s absolutely the best part, I can watch a million different movies, and feel a million different things for each one, and still nothing will ever compare to the feeling I get when I’m with you and think about us and our relationship",
  "You’re the one I want to talk to, you’re my person - To All the Boys I’ve Loved Before - You’re the only one I ever want to actually share meaningful conversation with, everything else is just all talk to pass time, yours is talk to lose track of time in. The kind that once over I’m stuck wishing for more, or for the time to reset and give me more time with you",
  "We need that touch from the one we love, almost as much as we need air - Five Feet Apart - Just with one touch and I completely crumble in submission for you, one touch is all it takes till I’m subdued in your spell",
  "It’s not finding your perfect half, it’s finding the other half of you - The Half of It - You’re both, all of the above and more, you’re truly my better half, the one I was always unconsciously looking and longing for, and now that I’ve found you I don’t know what life was before you",
  "She’s beautiful, but not just the kind of beautiful you see, the kind that’s hard to look away from - The Half of It - You’re the kind that captivates me with one glance, with one pierce of the eye and I’m drowning and I can’t manage to swim back",
  "I don’t want perfect, I want honest, I want messy. I want us - Always be my Maybe - No matter how tedious and meticulous it gets for us, I don’t care whatsoever, as long as it’s still us and we still both want us",
  "I was stupid, and scared , and insecure, but mostly I missed you - Always be my Maybe - I can get in over my head with many things, but I’ll always make sure it doesn’t affect us negatively, but I’ll always just be missing you",
  "Some of us get dipped in flat, some in satin, some in gloss, but very once in a while, you find someone who’s iridescent - Flipped - You, you are that iridescent rare find. There is no others like you, you shine so brightly everything else pales in comparison my love",
  "So this is love, so this is what makes life divine - Cinderella - Life with you is more than just divine, it’s absolutely magical and twinkling in all the best ways possible. I didn’t know how just divine life could get until you",
  "You were my new dream - Tangled - I have many dreams but now all those dreams include you, you are the most special part about all those dreams now, and that just makes me want to work even harder towards them",
  "Now that I see you, I see everything differently - Tangled - Now everything matters in a new light, more than ever I see things as for you and I. Nothing in a single perspective but for an us perspective",
  "My dream wouldn’t be complete without you in it - The Princess and the Frog - You’re the piece that completes it all, you complete my dreams entirely",
  "The flower that blooms in adversity is the most rare and beautiful of all - Mulan - You are that flower, with the life you live and the way you live it, your life truly isn’t the easiest my love and I can’t help but melt in admiration with the way you lead it. Head held up high and heart hard in chest you live life in the way people write about, and that is one of the best parts about you",
  "You’re the fairest of them all, but you’re kindness makes you beautiful - Snow White - It is not just your beauty that I can’t help but fawn over, it’s your kindness and gentleness the radiates off of you, the way you talk about your sister with such softness, the way you talk about your friends in the most admirable way and the way you talk about Naia all with strength and joy",
  "There’s this girl, she’s smart, and- and fun and beautiful. She’s got these eyes that just- and this hair wow- and her smile awh!! - Aladdin - Every single fucking thing he just said"
];

/* one pastel ball per message */
const NUM_BALLS = MESSAGES.length;

/* 💫 emoji pool for the badges */
const EMOJIS = ["🎁","💞","🎇","🌸","🌅","🌈","💌","🌷","🧸","🎃"];

const CLAW_SPEED = 3;   // px per frame (left‑right patrol)
const DROP_SPEED = 4;   // px per frame when dropping
const FRAME      = 16;  // ~60 fps

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

/* -------------------------------------------------------------
   Create ball DOM elements & scatter them randomly
   -------------------------------------------------------------*/
function spawnBalls () {
  const pad   = 6;                                // gap to walls
  const W     = ballArea.clientWidth  - 40 - pad; // 40 = ball dia.
  const H     = ballArea.clientHeight - 40 - pad;

  const MAX_TRIES = 60;  // stop searching if cabinet gets crowded

  for (let i = 0; i < NUM_BALLS; i++) {
    const div = document.createElement("div");
    div.className = `ball palette-${i % 6}`;
    div.dataset.emoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    ballArea.appendChild(div);

    /* ---- pick a random non‑overlapping spot ---- */
    let tries = 0, ok = false, x, y;
    while (!ok && tries < MAX_TRIES) {
      x = pad + Math.random() * W;
      y = pad + Math.random() * H;
      ok = balls.every(b => {
        const bx = parseFloat(b.style.left);
        const by = parseFloat(b.style.top);
        const dx = bx - x, dy = by - y;
        return Math.hypot(dx, dy) > 44;   // keep ~6 px gap
      });
      tries++;
    }

    /* place the ball */
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


