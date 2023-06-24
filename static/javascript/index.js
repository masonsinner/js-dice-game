const playDiv = document.getElementById('playDiv');
const heroDiv = document.getElementById('heroDiv');
const playBtn = document.getElementById('playBtn');
const rollBtn = document.getElementById('roll-btn');
const totalScoreDisplay = document.querySelector('#title-scores h3');
const diceImages = document.querySelectorAll('#dice-img img');

let totalScore = 0;

function toggleDiv(divId) {
  if (playDiv.style.display === 'none') {
    playDiv.style.display = 'block';
    heroDiv.style.display = 'none';
    playBtn.style.display = 'none';
  } else {
    playDiv.style.display = 'none';
    playBtn.style.display = 'block';
    heroDiv.style.display = 'block';
  }
}

function rollDice() {
  const scores = [];
  for (let i = 0; i < 6; i++) {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImages[i].setAttribute('src', `./static/img/dice/${diceRoll}.png`);
    diceImages[i].style.display = 'inline';
    scores.push(diceRoll);
  }
  updateScores(scores);
}

function updateScores(scores) {
  let roundScore = 0;

  const counts = [0, 0, 0, 0, 0, 0];
  scores.forEach((score) => {
    counts[score - 1]++;
  });

  // Calculate scores for each roll
  roundScore += counts[0] * 100; // Single 1's
  roundScore += counts[4] * 50; // Single 5's

  if (counts[0] >= 3) {
    roundScore += 1000; // 3 of a Kind 1's
    counts[0] -= 3;
  }
  for (let i = 1; i <= 4; i++) {
    if (counts[i] >= 3) {
      roundScore += (i + 1) * 100; // 3 of a Kind 2-5
      counts[i] -= 3;
    }
  }

  if (counts[0] === 1 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1 && counts[4] === 1 && counts[5] === 1) {
    roundScore += 1500; // Straight
  }

  totalScore += roundScore;

  // Display scores
  totalScoreDisplay.textContent = `Total Score: ${totalScore}`;
  console.log(`Scores: ${scores}`);
  console.log(`Round Score: ${roundScore}`);
  console.log(`Total Score: ${totalScore}`);

  // Check if the player has reached 10,000 points
  if (totalScore >= 10000) {
    console.log('You won the game!');
    alert(`Score: ${totalScore}! What the Fluff! You beat the house! This is why Mario is more successful`);
    playDiv.style.display = 'none'; // Hide the playDiv
    playBtn.style.display = 'block';
    heroDiv.style.display = 'block';
    resetGame();
  }
}

function resetGame() {
  totalScore = 0;
  totalScoreDisplay.textContent = 'Total Score: ';
  diceImages.forEach((diceImg) => {
    diceImg.setAttribute('src', '');
  });
}

rollBtn.addEventListener('click', rollDice);



