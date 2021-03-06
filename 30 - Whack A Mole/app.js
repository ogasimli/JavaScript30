const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('button');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const id = Math.floor(Math.random() * holes.length);
    const hole = holes[id];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(400, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        button.textContent = 'Start!';
    }, 10000)
}

function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    scoreBoard.textContent = score;
    this.classList.remove('up');
}

function toggleStart(e) {
    const text = button.textContent;
    if (text === 'Start!') {
        startGame();
        button.textContent = 'Stop!';
    } else {
        timeUp = true;
        button.textContent = 'Start!';
    }
}

moles.forEach(mole => mole.addEventListener('click', bonk));

button.addEventListener('click', toggleStart);