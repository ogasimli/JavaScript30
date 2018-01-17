const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

setInterval(setDate, 1000);

setDate();

function setDate() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();
    setSecond(second);
    setMinute(minute, second);
    setHour(hour, minute, second);
}

function setSecond(second) {
    console.log(`sec: ${second}`);
    const secondsDegree = ((second * 360) / 60) + 90;
    console.log(`sec degree: ${secondsDegree}`);
    secondHand.style.transform = `rotate(${secondsDegree}deg)`;
}

function setMinute(minute, second) {
    console.log(`min: ${minute}`);
    const minuteDegree = ((minute * 360) / 60) + ((second * 6) / 60) + 90;
    console.log(`min degree: ${minuteDegree}`);
    minHand.style.transform = `rotate(${minuteDegree}deg)`;
}

function setHour(hour, minute, second) {
    if (hour > 12) {
        hour -= 12;
    }
    console.log(`hour: ${hour}`);
    const hourDegree = ((hour * 360) / 12) + ((minute * 30) / 60) + ((second * 6) / 60) + 90;
    console.log(`hour degree: ${hourDegree}`);
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
}