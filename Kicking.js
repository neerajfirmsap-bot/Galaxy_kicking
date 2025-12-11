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
uiContainer.style.userSelect = 'none'; // Only on container
uiContainer.style.touchAction = 'none';

// Create button AFTER container styling
const runButton = document.createElement('button');
runButton.textContent = 'Run Imprison Script';
runButton.style.cursor = 'pointer';
runButton.style.width = '100%';
// NO user-select: none on button - allows clicks/taps
// NO touch-action: none on button

uiContainer.appendChild(runButton);
document.body.appendChild(uiContainer);

// Function to perform imprison actions
function runImprisonActions() {
    console.log('Button clicked!'); // Debug log
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

// Add button listener FIRST (before drag listeners)
runButton.addEventListener('click', runImprisonActions);

// Dragging logic - more selective to avoid button interference
let offsetX = 0, offsetY = 0, isDragging = false;

function startDrag(clientX, clientY) {
    const rect = uiContainer.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    isDragging = true;
    uiContainer.style.transition = 'none';
}

function performDrag(clientX, clientY) {
    if (!isDragging) return;
    let newLeft = clientX - offsetX;
    let newTop = clientY - offsetY;
    newLeft = Math.max(0, Math.min(window.innerWidth - uiContainer.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - uiContainer.offsetHeight, newTop));
    uiContainer.style.left = newLeft + 'px';
    uiContainer.style.top = newTop + 'px';
}

function stopDrag() {
    isDragging = false;
    uiContainer.style.transition = 'all 0.2s ease';
}

// Mouse - only on container (not button)
uiContainer.addEventListener('mousedown', (e) => {
    // Don't drag if clicking button
    if (e.target === runButton) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
    performDrag(e.clientX, e.clientY);
});

document.addEventListener('mouseup', stopDrag);

// Touch - only on container (not button), more conservative preventDefault
uiContainer.addEventListener('touchstart', (e) => {
    // Don't drag if touching button
    if (e.target === runButton) return;
    const touch = e.touches[0];
    if (!touch) return;
    e.preventDefault();
    startDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;
    e.preventDefault();
    performDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('touchend', stopDrag);
document.addEventListener('touchcancel', stopDrag);
