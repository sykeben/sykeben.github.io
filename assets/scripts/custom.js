//==============================================================================
// COMMON PAGE INITIALIZATION
//==============================================================================

// Loaded handler.
document.addEventListener("DOMContentLoaded", () => {

    // Back to top button functionality.
    document.getElementById("b2top")?.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });

    // Back to TOC button functionality.
    document.getElementById("b2toc")?.addEventListener("click", () => {
        document.getElementById("toc")?.scrollIntoView({ block: "center", inline: "center" });
    });

});
