//==============================================================================
// FRAME HIDER
//==============================================================================

// State variable.
let currentFrameHiddenState = false;

// Helper method.
function setFrameState(hidden) {

    // Skip if no change.
    if (currentFrameHiddenState == hidden) return;

    // Subhelper method.
    function updateElementState(id) {
        const elem = document.getElementById(id);
        if (hidden) {
            elem.classList.add('d-none');
        } else {
            elem.classList.remove('d-none');
        }
    }

    // Update element states.
    updateElementState('frame-top');
    updateElementState('frame-btm');
    updateElementState('b2top');

    // Update variable states.
    currentFrameHiddenState = hidden;
    // window.history.replaceState(null, null, hidden ? '?noframe' : '');

}

// Initializer.
function initFrameState() {
    const params = new URLSearchParams(window.location.search);
    setFrameState(params.has('noframe'));
}

// Toggler.
function toggleFrameState() {
    setFrameState(!currentFrameHiddenState);
}

//==============================================================================
// SUPPORT INITIALIZATION
//==============================================================================

document.addEventListener("DOMContentLoaded", function () {
    initFrameState();
});

// document.addEventListener("keypress", function (e) {
//     const key = e.key;
//     console.log(key);
//     if (key == "Escape") toggleFrameState();
// });
