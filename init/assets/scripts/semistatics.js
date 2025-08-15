//==============================================================================
// QUICKLINKS
//==============================================================================

// Initializer.
function initQuicklinks() {

    // Get elements.
    const listing = document.getElementById("quicklinks-list");

    // Define link collection.
    const links = [
        { url: "https://purdue.brightspace.com/", title: "Brightspace", icon: "easel2" },
        { url: "https://dig.shovelapp.io/", title: "Shovel", icon: "calendar2-week" },
        { url: "https://purdue.brightspace.com/", title: "Piazza", icon: "chat-quote" },
        { url: "https://www.gradescope.com/", title: "Gradescope", icon: "bar-chart-line" },
        { url: "https://purdue.campus.eab.com", title: "BoilerConnect", icon: "person-badge" },
        { url: "https://mypurdue.purdue.edu/", title: "MyPurdue", icon: "mortarboard" },
        { url: "https://outlook.office.com/?realm=purdue.edu", title: "Outlook", icon: "envelope-at" },
        { url: "https://wpvapppcprt01.itap.purdue.edu:9192/mobile/release", title: "Printing", icon: "printer" },
        { url: "https://lslab.ics.purdue.edu/icsWeb/LabMap", title: "ITaP Labs", icon: "pc-display" },
        { url: "https://sykeben.github.io/study-area-finder/", title: "Where2Study", icon: "pin-map" }
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
        a.target = "_blank";

        // Add to container.
        let order = [i, span, a];
        if (index % 2 != 0) order.reverse();
        order.forEach((elem) => div.appendChild(elem));

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
// RESISTOR COLOR CODES
//==============================================================================

// Initializer.
function initRColorCodes() {

    // Get static elements.
    const elemSel = document.getElementById("rcc-bandsel");
    const elemCol = document.getElementById("rcc-bandcol");
    const elemTyp = document.getElementById("rcc-bandtyp");
    const valueResult = document.getElementById("rcc-value");
    const toleranceResult = document.getElementById("rcc-tolerance");
    const tcrResult = document.getElementById("rcc-tcr");

    // Define band information.
    const bandCounts = [3, 4, 5, 6];
    const bandNames = ["val1", "val2", "val3", "mul", "tol", "tcr"];
    const bandTypes = ["1st", "2nd", "3rd", "Mul.", "Tol.", "TCR"];
    const bandGroups = [[1, 0, 3], [1, 0, 3, 4], [2, 1, 0, 3, 4], [2, 1, 0, 3, 4, 5]];
    const bandColors = [
        { name: "Blk", full: "Black", val: 0, mul: 0, tcr: 250 },
        { name: "Brn", full: "Brown", val: 1, mul: 1, tol: 1, tcr: 100 },
        { name: "Red", full: "Red", val: 2, mul: 2, tol: 2, tcr: 50 },
        { name: "Org", full: "Orange", val: 3, mul: 3, tol: 0.05, tcr: 15 },
        { name: "Yel", full: "Yellow", val: 4, mul: 4, tol: 0.02, tcr: 25 },
        { name: "Grn", full: "Green", val: 5, mul: 5, tol: 0.5, tcr: 20 },
        { name: "Blu", full: "Blue", val: 6, mul: 6, tol: 0.25, tcr: 10 },
        { name: "Vio", full: "Violet", val: 7, mul: 7, tol: 0.1, tcr: 5 },
        { name: "Gry", full: "Gray", val: 8, mul: 8, tol: 0.01, tcr: 1 },
        { name: "Wht", full: "White", val: 9, mul: 9 },
        { name: "Gld", full: "Gold", mul: -1, tol: 5 },
        { name: "Slv", full: "Silver", mul: -2, tol: 10 },
        { name: "Pnk", full: "Pink", mul: -3 }
    ];

    // Results updater.
    var currIndex = 0;
    function updateResults() {

        // Initialize results.
        var ind = 0;
        var sum = 0;
        var tol = 0;
        var tcr = 0;

        // Calculate accordingly.
        bandGroups[currIndex].forEach((group) => {

            // Get values.
            const bandName = bandNames[group];
            const rawValue = JSON.parse(document.getElementById(`rcc-bandcol-${bandName}`).value).value;
            const typeId = bandName.substring(0, 3);

            // Perform operation.
            switch (typeId) {
                case "val":
                    sum += rawValue * Math.pow(10, ind);
                    ind++;
                    break;
                case "mul":
                    sum = sum * Math.pow(10, rawValue);
                    break;
                case "tol":
                    tol = rawValue;
                    break;
                case "tcr":
                    tcr = rawValue;
                    break;
                default: break;
            }

        });

        // Format resistance value with SI prefixes
        function formatResistance(value) {
            if (value >= 1e9) return (value / 1e9).toFixed(2) + "G";
            if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
            if (value >= 1e3) return (value / 1e3).toFixed(2) + "k";
            return value.toFixed(3);
        }

        // Update displays.
        valueResult.textContent = formatResistance(sum);
        toleranceResult.textContent = tol;
        tcrResult.textContent = tcr;

    }

    // Generate band selectors.
    elemSel.innerHTML = "";
    var defaultSel = null;
    bandCounts.forEach((count, index) => {

        // Generate selection id.
        const selectId = `rcc-bandsel-${count}`;

        // Create input.
        const input = document.createElement("input");
        input.type = "radio";
        input.classList.add("btn-check");
        input.name = "rcc-bandsel";
        input.id = selectId;
        input.value = index;
        input.autocomplete = "off";
        input.checked = (index == 0);
        elemSel.appendChild(input);

        // Create label.
        const label = document.createElement("label");
        label.classList.add("btn", "btn-outline-primary", "text-body");
        label.htmlFor = selectId;
        label.textContent = `${count} Band`;
        elemSel.appendChild(label);

        // Set up input event listener.
        function handleChange(doResults = true) {

            // Update index.
            currIndex = parseInt(input.value, 10);

            // Get groups.
            const groups = bandGroups[currIndex];

            // Update color selector visibilities.
            bandNames.forEach((bandName, index) => {
                const div1 = document.getElementById(`rcc-bandcol-${bandName}-parent`);
                const div2 = document.getElementById(`rcc-bandtyp-${bandName}`);
                if (groups.includes(index)) {
                    div1.classList.remove('d-none');
                    div2.classList.remove('d-none');
                } else {
                    div1.classList.add('d-none');
                    div2.classList.add('d-none');
                }
            });

            // Update tolerance visibility.
            const tol = document.getElementById("rcc-tolerance-parent");
            if (input.value == "0") {
                tol.classList.add('d-none');
            } else {
                tol.classList.remove('d-none');
            }

            // Update TCR visibility.
            const tcr = document.getElementById("rcc-tcr-parent");
            if (input.value != "3") {
                tcr.classList.add('d-none');
            } else {
                tcr.classList.remove('d-none');
            }

            // Update results.
            if (doResults) updateResults();

            // Rearrange.
            masonry.layout();

        }
        if (input.checked) defaultSel = handleChange;
        input.addEventListener("change", () => handleChange());

    });

    // Generate color selectors/types.
    elemCol.innerHTML = "";
    elemTyp.innerHTML = "";
    var defaultCols = [];
    bandNames.forEach((bandName, index) => {

        // Generate ids.
        const selectId = `rcc-bandcol-${bandName}`;
        const div1Id = `${selectId}-parent`;
        const div2Id = `rcc-bandtyp-${bandName}`;
        const typeId = bandName.substring(0, 3);

        // Create parent 1.
        const parent1 = document.createElement("div");
        parent1.classList.add("col");
        parent1.id = div1Id;

        // Create parent 2.
        const parent2 = document.createElement("div");
        parent2.classList.add("col");
        parent2.id = div2Id;
        parent2.textContent = bandTypes[index];

        // Create selector.
        const select = document.createElement("select");
        select.classList.add("form-select", "form-select-sm", "nodrop");
        select.id = selectId;

        // Append children.
        bandColors.forEach((color, index) => {
            if (!Object.hasOwn(color, typeId)) return;
            const option = document.createElement("option");
            option.value = JSON.stringify({ value: color[typeId], color: color.full });
            option.textContent = color.name;
            option.selected = (index == 0);
            select.appendChild(option);
        });
        parent1.appendChild(select);
        elemCol.appendChild(parent1);
        elemTyp.appendChild(parent2);

        // Set up select event listener.
        function handleChange(doResults = true) {

            // Get value object.
            const value = JSON.parse(select.value);

            // Update border color.
            select.style.borderColor = value.color;

            // Update results.
            if (doResults) updateResults();

        }
        defaultCols.push(handleChange);
        select.addEventListener("change", () => handleChange());

    });

    // Hit defaults.
    defaultCols.forEach((col) => col(false));
    defaultSel(false);
    updateResults();

}

function initStockTicker() {

    // Get elements.
    const container = document.getElementById("ticker-widget");

    // Define ticker config.
    const tickerConfig = {
        symbols: [
            { description: "T", proName: "NYSE:T" },
            { description: "QBTS", proName: "NYSE:QBTS" },
            { description: "FXAIX", proName: "NASDAQ:FXAIX" },
            { description: "FNSTX", proName: "NASDAQ:FNSTX" },
            { description: "HPE", proName: "NYSE:HPE" },
            { description: "HMC", proName: "NYSE:HMC" },
            { description: "RIVN", proName: "NASDAQ:RIVN" },
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "compact",
        colorTheme: "dark",
        locale: "en"
    };

    // Initialize script.
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.innerHTML = JSON.stringify(tickerConfig);
    container.append(script);

}

//==============================================================================
// SEMI-STATIC INITIALIZATION
//==============================================================================

document.addEventListener("DOMContentLoaded", function () {
    initQuicklinks();
    initSIRatio();
    initSelfDestruct();
    initRColorCodes();
    initStockTicker();
});
