let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let remainderSeconds = seconds;
    const hours = Math.floor(remainderSeconds / 3600);
    remainderSeconds = remainderSeconds % 3600;
    const minutes = Math.floor(remainderSeconds / 60);
    remainderSeconds = remainderSeconds % 60;
    const displayValue = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = displayValue;
    document.title = displayValue;
    console.log({ displayValue });
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const mins = form.minutes.value;
    timer(mins * 60);
    form.reset();
});