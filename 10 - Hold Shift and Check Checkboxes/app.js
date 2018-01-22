const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

let lastChecked;

function handleCheck(event) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (event.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) checkbox.checked = true;
        });
    }
    lastChecked = this;
}