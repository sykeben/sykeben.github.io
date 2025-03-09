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
// SEMI-STATIC INITIALIZATION
//==============================================================================

document.addEventListener("DOMContentLoaded", function () {
    initSIRatio();
});
