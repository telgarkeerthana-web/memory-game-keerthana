
const emojis = [
    "🍎", "🍌", "🍇", "🍒",
    "🍓", "🍍", "🥝", "🍉"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;
let seconds = 0;
let timerInterval = null;
let timerStarted = false;

const gameBoard = document.getElementById("gameBoard");

function shuffleCards() {
    cards = [...emojis, ...emojis];

    cards.sort(() => Math.random() - 0.5);
}

function createCards() {
    gameBoard.innerHTML = "";

    cards.forEach((emoji) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = "?";

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

function startTimer() {
    if (timerStarted) return;

    timerStarted = true;

    timerInterval = setInterval(() => {
        seconds++;

        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(remainingSeconds).padStart(2, "0");

    }, 1000);
}

function flipCard(card) {
    if (
        lockBoard ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    startTimer();

    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    document.getElementById("moves").textContent = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;

        document.getElementById("matches").textContent =
            matches + " / 8";

        resetCards();

        if (matches === 8) {
            clearInterval(timerInterval);

            document.getElementById("message").textContent =
                "Congratulations! You won!";
        }

    } else {

        lockBoard = true;

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetCards();
        }, 800);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    clearInterval(timerInterval);

    moves = 0;
    matches = 0;
    seconds = 0;

    timerStarted = false;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    document.getElementById("moves").textContent = "0";
    document.getElementById("matches").textContent = "0 / 8";
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("message").textContent = "";

    shuffleCards();
    createCards();
}

// Start game
restartGame();
