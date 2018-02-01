const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(data => {
    const coords = data.coords;
    speed.textContent = coords.speed;
    arrow.style.transform = `rotate(${coords.heading}deg)`;
}, err => {
    console.error(err);
    alert('Please allow acces to your location!');
});