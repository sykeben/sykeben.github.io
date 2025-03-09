//==============================================================================
// QUICKLINKS
//==============================================================================

// Initializer.
function initQuicklinks() {

    // Get elements.
    const listing = document.getElementById("quicklinks-list");

    // Define link collection.
    const links = [
        {
            url: "https://purdue.brightspace.com/",
            title: "Brightspace", icon: "easel2"
        }, {
            url: "https://dig.shovelapp.io/",
            title: "Shovel", icon: "calendar2-week"
        }, {
            url: "https://purdue.brightspace.com/",
            title: "Piazza", icon: "chat-quote"
        }, {
            url: "https://www.gradescope.com/",
            title: "Gradescope", icon: "bar-chart-line"
        }, {
            url: "https://bus.gocitybus.com/RouteMap/Index",
            title: "CityBus", icon: "bus-front"
        }, {
            url: "https://mypurdue.purdue.edu/",
            title: "MyPurdue", icon: "mortarboard"
        }, {
            url: "https://outlook.office.com/?realm=purdue.edu",
            title: "Outlook", icon: "envelope-at"
        }, {
            url: "https://wpvapppcprt01.itap.purdue.edu:9192/mobile/release",
            title: "Printing", icon: "printer"
        }, {
            url: "https://lslab.ics.purdue.edu/icsWeb/LabMap",
            title: "ITaP Labs", icon: "pc-display"
        }, {
            url: "https://sykeben.github.io/study-area-finder/",
            title: "Where2Study", icon: "pin-map"
        }
    ];

    // Generate links.
    listing.innerHTML = "";
    links.forEach((link, index) => {

        // Create container.
        const div = document.createElement("div");
        div.classList.add("col");

        // Create icon.
        const i = document.createElement("i");
        i.classList.add("bi", `bi-${link.icon}`);

        // Create spacer.
        const span = document.createElement("span");
        span.textContent = " ";

        // Create anchor.
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.title;

        // Add to container.
        if (index % 2 == 0) {
            div.appendChild(i);
            div.appendChild(span);
            div.appendChild(a);
        } else {
            div.appendChild(a);
            div.appendChild(span);
            div.appendChild(i);
        }

        // Add to listing.
        listing.appendChild(div);

    });

}

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

    // Define selection options.
    const siPrefixes = [
        { value: 24, label: "yotta (Y)" },
        { value: 21, label: "zetta (Z)" },
        { value: 18, label: "exa (E)" },
        { value: 15, label: "peta (P)" },
        { value: 12, label: "tera (T)" },
        { value: 9, label: "giga (G)" },
        { value: 6, label: "mega (M)" },
        { value: 3, label: "kilo (k)" },
        { value: 2, label: "hecto (h)" },
        { value: 1, label: "deca (da)" },
        "separator",
        { value: 0, label: "none", selected: true },
        "separator",
        { value: -1, label: "deci (d)" },
        { value: -2, label: "centi (c)" },
        { value: -3, label: "milli (m)" },
        { value: -6, label: "micro (µ)" },
        { value: -9, label: "nano (n)" },
        { value: -12, label: "pico (p)" },
        { value: -15, label: "femto (f)" },
        { value: -18, label: "atto (a)" },
        { value: -21, label: "zepto (z)" },
        { value: -24, label: "yocto (y)" }
    ];

    // Initialize selection boxes.
    [fromFix, toFix].forEach((box) => {
        box.innerHTML = "";
        siPrefixes.forEach((item) => {
            if (item === "separator") {
                const option = document.createElement("option");
                option.value = "null";
                option.disabled = true;
                option.textContent = "──────────";
                box.appendChild(option);
            } else {
                const option = document.createElement("option");
                option.value = item.value;
                option.textContent = item.label;
                if (item.selected) option.selected = true;
                box.appendChild(option);
            }
        });
    });

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
            document.body.classList.add("boom");

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
                document.body.classList.remove("boom");
                flash.remove();
                explosion.remove();
            }, { once: true });

        }, { once: true });

    }

    // Add listeners.
    bigRedBtn.addEventListener("click", generateModal);
    modalYesBtn.addEventListener("click", triggerBigBoom);

}

//==============================================================================
// SEMI-STATIC INITIALIZATION
//==============================================================================

document.addEventListener("DOMContentLoaded", function () {
    initQuicklinks();
    initSIRatio();
    initSelfDestruct();
});
