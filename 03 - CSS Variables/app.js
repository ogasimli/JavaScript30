// get inputs
const inputs = [].slice.call(document.querySelectorAll('.controls input'));

// add event listeners
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

function handleUpdate() {
    // append 'px' to the end of spacing and blur variables
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}