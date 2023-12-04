console.log("kb1.js loaded");

const words = [
  "apple",
  "banana",
  "coconut",
  "durian",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "mango",
  "orange",
  "papaya",
  "raspberry",
  "strawberry",
  "watermelon",
].sort(() => Math.random() - 0.5);

let round = 0;

function addKeyboardListeners() {
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const letters = Array.from(
      document.querySelectorAll(`.letter[data-key="${key}"]`)
    );

    const letter = letters.find(
      (letter) => !letter.classList.contains("pressed")
    );

    if (letter) {
      letter.classList.add("pressed");
      setTimeout(() => {
        letter.classList.remove("pressed");
        letter.remove();
        if (hasCompletedWord()) {
          generateConfetti();
          nextRound();
        }
      }, 1000);
    }
  });
}

function renderBackgroundImg() {
  // delete previous img
  const prevImg = document.querySelector("img");
  if (prevImg) {
    prevImg.remove();
  }

  const body = document.querySelector("body");
  const img = document.createElement("img");

  img.src = `imgs/${words[round]}.jpg`;
  img.classList.add("background-img");

  img.onload = () => {
    body.appendChild(img);
  };
}

function renderWord(word) {
  renderBackgroundImg();

  const wordContainer = document.querySelector(".word");
  wordContainer.innerHTML = "";
  for (const letter of word) {
    const letterSpan = document.createElement("span");
    letterSpan.classList.add("letter");
    letterSpan.dataset.key = letter;
    letterSpan.textContent = letter.toUpperCase();
    wordContainer.appendChild(letterSpan);
  }
}

function hasCompletedWord() {
  const wordContainer = document.querySelector(".word");
  return wordContainer.children.length === 0;
}

function getNextColourSet() {
  const reddish = [
    "#FFB6C1",
    "#FFA07A",
    "#FF7F50",
    "#FF4500",
    "#FFD700",
    "#FFA500",
    "#FF8C00",
  ];

  const blueish = [
    "#00FFFF",
    "#00CED1",
    "#00BFFF",
    "#1E90FF",
    "#4169E1",
    "#0000FF",
  ];

  const greenish = [
    "#00FF00",
    "#32CD32",
    "#98FB98",
    "#90EE90",
    "#00FA9A",
    "#00FF7F",
    "#3CB371",
  ];

  const colours = [reddish, blueish, greenish];
  return colours[round % colours.length];
}

function generateConfetti() {
  const colors = getNextColourSet();

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.top = `${(i / 100) * 100}vh`;
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(confetti);

      // Random animation duration between 2 to 5 seconds
      const animationDuration = Math.random() * 3 + 2; // Generates a number between 2 and 5
      confetti.style.animation = `fall ${animationDuration}s linear`;

      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000);
    }, i * 50);
  }
}

function nextRound() {
  round++;
  if (round >= words.length) {
    alert("Yay!! You did it! 👏");
    return;
  }
  startNextRound();
}

function startNextRound() {
  const word = words[round];
  renderWord(word);
}

function init() {
  addKeyboardListeners();
  startNextRound();
}

init();
