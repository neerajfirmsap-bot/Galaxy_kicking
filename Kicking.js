// Create a container div for the UI
const uiContainer = document.createElement('div');
uiContainer.id = "imprisonScriptUI";
uiContainer.style.position = 'fixed';
// Use top and left instead of bottom and right with initial position values
uiContainer.style.top = 'calc(100vh - 80px)';  // approximately 20px from bottom, adjust as needed
uiContainer.style.left = 'calc(100vw - 170px)'; // approximately 20px from right, adjust as needed
uiContainer.style.zIndex = 9999;
uiContainer.style.backgroundColor = 'white';
uiContainer.style.border = '1px solid black';
uiContainer.style.padding = '10px';
uiContainer.style.borderRadius = '5px';
uiContainer.style.width = '150px';
uiContainer.style.cursor = 'move'; // Indicate draggable

// Create a button element inside the container
const runButton = document.createElement('button');
runButton.textContent = 'Run Imprison Script';
runButton.style.cursor = 'pointer';
runButton.style.width = '100%';

uiContainer.appendChild(runButton);
document.body.appendChild(uiContainer);

// Function to perform imprison actions
function runImprisonActions() {
    const userButtons = document.querySelectorAll('.planet-bar__button__action');
    if (userButtons.length > 0) userButtons[0].click();

    document.querySelectorAll('.mdc-list-item__text').forEach(action => {
        if (action.innerText === 'Imprison') action.click();
    });
    document.querySelectorAll('.mdc-list-item__text').forEach(action => {
        if (action.innerText === 'Exit') action.click();
    });
    setTimeout(() => {
        const startUsers = document.querySelectorAll('.start__user');
        if (startUsers.length > 0) startUsers[0].click();
    }, 500);
}
runButton.addEventListener('click', runImprisonActions);

// Implement dragging logic on the entire container
let offsetX = 0, offsetY = 0, isDragging = false;

uiContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    // Calculate offset from mouse pointer to container top-left corner
    offsetX = e.clientX - uiContainer.getBoundingClientRect().left;
    offsetY = e.clientY - uiContainer.getBoundingClientRect().top;
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;
    // Clamp within viewport
    newLeft = Math.max(0, Math.min(window.innerWidth - uiContainer.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - uiContainer.offsetHeight, newTop));
    uiContainer.style.left = newLeft + 'px';
    uiContainer.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    }
});
