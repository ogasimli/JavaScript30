/* Get elements */
const body = document.querySelector('body');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out the functions */

// Play, pause video
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

// Change play button icon
function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

// Skipp video
function skip(skipTime) {
    video.currentTime += skipTime;
}

// Handle volume and speed changes
function handleRangeUpdate() {
    video[this.name] = this.value;
  }

// Handle progress bar indicator
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Handle sliding of progress bar
function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */

// Listen to click events to video or toggle button to toggle play/pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Listen to playing status of video to change the button icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Listen to click events to skip buttons
skipButtons.forEach(button => button.addEventListener('click', () => skip(parseFloat(button.dataset.skip))));
body.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 39: // Arrow right
            skip(video.duration * 0.005);
            break;
        case 37: // Arrow left
            skip(video.duration * -0.005);
            break;
        default:
            break;
    }
});

// Listen to changes of volume and speed ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Listen to time update of video and update progress bar indicator
video.addEventListener('timeupdate', handleProgress);

// Listen to progress bar indicator click and mouse events and update video time
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);