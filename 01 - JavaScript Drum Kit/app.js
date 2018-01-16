// Add 'keydown' eventlistener to the window
window.addEventListener('keydown', playSound);

// Get list of divs with key class
const keys = Array.from(document.querySelectorAll('.key'));
// Attach event listener to all of them
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Function for finding audio and key elements from DOM and manipulating them
function playSound(event) {
    console.log(event.keyCode);
    // Find audio element corresponding to pressed button
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    // Find key element corresponding to pressed button    
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    console.log(audio);
    console.log(key);
    // Return if no audio element was found
    if (!audio) return;
    // Restart audio
    audio.currentTime = 0;
    // Play audio
    audio.play();
    // Add 'playing' class to key element
    key.classList.add('playing');
};

// Function to remove 'playing' class from keys
function removeTransition(event) {
    // Reomve class only if event's property name is equal to 'transform'
    if (event.propertyName != 'transform') return;
    event.target.classList.remove('playing');
}
