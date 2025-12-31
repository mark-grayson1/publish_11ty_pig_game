let scores = [0, 0];  //player scores
let wins = [0, 0];    //player wins
let currentScore = 0;
let activePlayer = 1;
let playing = true;

const score1Txt = document.querySelector("#score--1"); 
const score2Txt = document.querySelector("#score--2");
const wins1Txt = document.querySelector("#wins--1"); 
const wins2Txt = document.querySelector("#wins--2");
const current1Txt = document.querySelector("#current--1");
const current2Txt = document.querySelector("#current--2");
const diceImg = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const player1Txt = document.querySelector(".player--1");
const player2Txt = document.querySelector(".player--2");

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;
  score1Txt.textContent = "0";
  score2Txt.textContent = "0";
  current1Txt.textContent = "0";
  current2Txt.textContent = "0";
  player1Txt.classList.remove("player--winner");
  player2Txt.classList.remove("player--winner");
  player1Txt.classList.add("player--active");
  player2Txt.classList.remove("player--active");
  diceImg.style.display = "none";
  console.log("Game reset");
};

init();

function generateDiceRoll() {
  let dice = Math.floor(Math.random() * 6) + 1;

  diceImg.style.display = "block";
  diceImg.src = "/publish_11ty_pig_game/dice-${dice}.png";
  console.log(`Player ${activePlayer} rolled:
      ${dice}`);

  return dice;
}

function generateTotalScore()
{
  let totalScoreIndex = activePlayer - 1
  scores[totalScoreIndex] += currentScore;
}

function switchPlayer () {
  currentScore = 0;

  document.querySelector(`#current--${activePlayer}`).textContent = "0";
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1Txt.classList.toggle("player--active");
  player2Txt.classList.toggle("player--active");
  console.log(`Switch to Player ${activePlayer + 1}`);
};

function checkWinner(params) {
  playing = false;
  diceImg.style.display = "none";
  wins[activePlayer - 1]++;

  document.querySelector(`#wins--${activePlayer}`).textContent = `Wins: ${wins[activePlayer - 1]}`;
  document.querySelector(`.player--${activePlayer}`).classList.add  ("player--winner");
  document.querySelector(`.player--${activePlayer}`).classList.remove   ("player--active");

  console.log(`Player ${activePlayer} wins the game! Total Wins: ${wins[activePlayer - 1]}`);
  };

rollBtn.addEventListener("click", ()=> {
  if (playing) {
    let dice = generateDiceRoll();

    if(dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
      }
  }
});

holdBtn.addEventListener("click", ()=> {
  if (playing) {
    generateTotalScore();
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer - 1];

    console.log(`Player ${activePlayer - 1} holds:
      Total Score: ${scores[activePlayer - 1]}`);

    if (scores[activePlayer - 1] >= 100) {
      checkWinner();
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", init);