//==============================================================================
// SI RATIO CONVERSION
//==============================================================================

// Initializer.
function initSIRatio() {

    // Get elements.
    const fromFix = document.getElementById("si-ratio-from-fix");
    const toFix = document.getElementById("si-ratio-to-fix");
    const fromVal = document.getElementById("si-ratio-from-val");
    const toVal = document.getElementById("si-ratio-to-val");

    // Conversion method.
    function convert(fromInput) {

        // Get values.
        const fromPower = parseInt(fromFix.value, 10);
        const toPower = parseInt(toFix.value, 10);
        const scaleFactor = Math.pow(10, fromPower - toPower);

        // Update.
        if (fromInput) {
            toVal.value = fromVal.value ? (parseFloat(fromVal.value) * scaleFactor).toPrecision(6) : "";
        } else {
            fromVal.value = toVal.value ? (parseFloat(toVal.value) / scaleFactor).toPrecision(6) : "";
        }

    }

    // Add listeners.
    fromFix.addEventListener("change", () => convert(true));
    toFix.addEventListener("change", () => convert(true));
    fromVal.addEventListener("input", () => convert(true));
    toVal.addEventListener("input", () => convert(false));

}

//==============================================================================
// SELF DESTRUCT BUTTON
//==============================================================================

// Initializer.
function initSelfDestruct() {

    // Get elements.
    const bigRedBtn = document.getElementById("selfdestruct-btn");
    const modalContain = document.getElementById("selfdestruct-modal");
    const modalTitle = document.getElementById("selfdestruct-modal-title");
    const modalDescription = document.getElementById("selfdestruct-modal-desc");
    const modalNoBtn = document.getElementById("selfdestruct-modal-no");
    const modalYesBtn = document.getElementById("selfdestruct-modal-yes");

    // Define titles.
    const modalTitles = [
        "Ready to Break Stuff?",
        "Unleash the Chaos?",
        "Do You Dare?",
        "This Will Hurt... You Sure?",
        "Go Big or Go Home!",
        "Are You Ready to Break Everything?",
        "Risk It All?",
        "This Will End Well... Right?",
        "You Sure About This?",
        "Brace for Impact!",
        "Make It Happen?",
        "Last Chance!"
    ];

    // Define descriptions.
    const modalDescriptions = [
        "Pressing this button will start an irreversible chain of events that no one can stop. Proceed at your own risk.",
        "This action is so extreme, it might even break the space-time continuum. Are you prepared for that?",
        "It's not just a button. It's the button. Once you press it, there's no going back. Your logs will remember you.",
        "This will cause your entire environment to go into meltdown. But hey, at least you tried!",
        "What if I told you pressing this button will make your code disappear forever? No one will ever know what you wrote here.",
        "This is the digital equivalent of deleting system32. You sure you wanna go through with this?",
        "This is no ordinary button. You might end up with a corrupted universe if you press it.",
        "This button will cause a chain reaction that not even the most experienced developers can undo.",
        "Once you press this, it's like pulling the plug on the mainframe. Your machine will never be the same.",
        "If you proceed, you might be sending your code straight into the void, where no one can retrieve it.",
        "Proceeding will unleash a series of unfortunate events that can never be undone. Think carefully.",
        "You are about to execute a command that could cause catastrophic failure. It's your move now!"
    ];

    // Define no button texts.
    const noButtonTexts = [
        "No, Let's Not.",
        "Cancel It.",
        "Not Today.",
        "Abort!",
        "I'll Pass.",
        "Nope.",
        "Not Yet.",
        "I'm Out.",
        "Not Feeling It.",
        "I'll Wait.",
        "Stop. Cancel.",
        "No Thanks."
    ];

    // Define yes button texts.
    const yesButtonTexts = [
        "Yes, Let's Break It!",
        "Go for It!",
        "Let's Do This!",
        "Yolo!",
        "Send It!",
        "I'm In!",
        "Commit to the Chaos!",
        "Do It!",
        "Let's Roll!",
        "Break It!",
        "Yes, Please!",
        "Full Send!"
    ];

    // Temporary listings.
    let modalTitlesTemp = [];
    let modalDescriptionsTemp = [];
    let noButtonTextsTemp = [];
    let yesButtonTextsTemp = [];

    // Modal generation method.
    function generateModal() {

        // Prepare title.
        if (modalTitlesTemp.length <= 0) {
            modalTitlesTemp = Array.from(modalTitles);
            modalTitlesTemp.sort(() => Math.random() - 0.5);
        }
        modalTitle.textContent = modalTitlesTemp.pop();

        // Prepare description.
        if (modalDescriptionsTemp.length <= 0) {
            modalDescriptionsTemp = Array.from(modalDescriptions);
            modalDescriptionsTemp.sort(() => Math.random() - 0.5);
        }
        modalDescription.textContent = modalDescriptionsTemp.pop();

        // Prepare no button.
        if (noButtonTextsTemp.length <= 0) {
            noButtonTextsTemp = Array.from(noButtonTexts);
            noButtonTextsTemp.sort(() => Math.random() - 0.5);
        }
        modalNoBtn.textContent = noButtonTextsTemp.pop();

        // Prepare yes button.
        if (yesButtonTextsTemp.length <= 0) {
            yesButtonTextsTemp = Array.from(yesButtonTexts);
            yesButtonTextsTemp.sort(() => Math.random() - 0.5);
        }
        modalYesBtn.textContent = yesButtonTextsTemp.pop();

    }

    // Explosion trigger method.
    function triggerBigBoom() {

        // Trigger after modal goes away.
        modalContain.addEventListener("hidden.bs.modal", () => {

            // Update body.
            document.body.classList.add("explosion-body");

            // Create flash.
            var flash = document.createElement("div");
            flash.classList.add("flash");
            flash = document.body.appendChild(flash);

            // Create explosion.
            var explosion = document.createElement("div");
            explosion.classList.add("explosion");
            explosion = document.body.appendChild(explosion);

            // Remove elements/classes after animation completes.
            explosion.addEventListener("animationend", () => {
                document.body.classList.remove("explosion-body");
                flash.remove();
                explosion.remove();
            }, {once: true});

        }, {once: true});

    }

    // Add listeners.
    bigRedBtn.addEventListener("click", generateModal);
    modalYesBtn.addEventListener("click", triggerBigBoom);

}

//==============================================================================
// SEMI-STATIC INITIALIZATION
//==============================================================================

document.addEventListener("DOMContentLoaded", function () {
    initSIRatio();
    initSelfDestruct();
});
