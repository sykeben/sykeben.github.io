// Setting Definitions
const backLink = "../../../webgames.html";

// Document Initialization
$(document).ready(() => {

    // Create back button (if applicable)
    if ($("#back-container").length) $("#back-container").append(`<a id="back-button" href="${backLink}" tabindex="-1">&ltrif; Home</a>`);

});