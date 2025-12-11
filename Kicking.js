// Create a container div for the UI
const uiContainer = document.createElement('div');
uiContainer.id = "imprisonScriptUI";
uiContainer.style.position = 'fixed';
uiContainer.style.top = 'calc(100vh - 80px)';
uiContainer.style.left = 'calc(100vw - 170px)';
uiContainer.style.zIndex = 9999;
uiContainer.style.backgroundColor = 'white';
uiContainer.style.border = '1px solid black';
uiContainer.style.padding = '10px';
uiContainer.style.borderRadius = '5px';
uiContainer.style.width = '150px';
uiContainer.style.cursor = 'move';
uiContainer.style.touchAction = "none";   // IMPORTANT FOR ANDROID TOUCH

// Button
const runButton = document.createElement('button');
runButton.textContent = 'Run Imprison Script';
runButton.style.cursor = 'pointer';
runButton.style.width = '100%';

uiContainer.appendChild(runButton);
document.body.appendChild(uiContainer);

// Imprison function
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

// ------------------------
// DRAGGING (MOUSE + TOUCH)
// ------------------------
let offsetX = 0, offsetY = 0, isDragging = false;

// Start drag (mouse)
uiContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    offsetX = e.clientX - uiContainer.getBoundingClientRect().left;
    offsetY = e.clientY - uiContainer.getBoundingClientRect().top;
    isDragging = true;
});

// Start drag (touch)
uiContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    offsetX = touch.clientX - uiContainer.getBoundingClientRect().left;
    offsetY = touch.clientY - uiContainer.getBoundingClientRect().top;
    isDragging = true;
});

// Moving (mouse)
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    moveUI(e.clientX, e.clientY);
});

// Moving (touch)
document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    moveUI(touch.clientX, touch.clientY);
});

// Stop drag
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('touchend', () => isDragging = false);

// Helper for clamped movement
function moveUI(x, y) {
    let newLeft = x - offsetX;
    let newTop = y - offsetY;
    newLeft = Math.max(0, Math.min(window.innerWidth - uiContainer.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - uiContainer.offsetHeight, newTop));
    uiContainer.style.left = newLeft + 'px';
    uiContainer.style.top = newTop + 'px';
}
