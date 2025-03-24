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
    const tocBlock = document.getElementById("toc");
    if (tocBlock) document.getElementById("b2toc")?.addEventListener("click", () => {
        tocBlock.scrollIntoView({
            block: "center",
            inline: "center"
        });
    });

    // Goto button functionality.
    [...document.getElementsByClassName("btn-goto")].forEach((btn) => {

        // Get targets.
        const gotoId = btn.getAttribute("data-goto-id");
        if (!gotoId) return;
        const gotoBlock = document.getElementById(gotoId);
        if (!gotoBlock) return;

        // Configure event.
        btn.addEventListener("click", () => {
            gotoBlock.scrollIntoView({
                block: "start",
                inline: "nearest"
            });
        });

    });

});
