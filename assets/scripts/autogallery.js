'use strict';

// Generates a gallery on the page using URL parameters.
function generateGallery() {

    // Get URL parameters.
    const params = new URLSearchParams(window.location.search);
    if (!params.has("set") && !params.has("size")) return false;
    const set = params.get("set").replace(/[^\w]/g, "-");
    const size = parseInt(params.get("size"), 10);

    // Get base URL.
    const baseURL = `/assets/photos/${set}`;

    // Get elements.
    const gallery = document.getElementById("gallery");
    const template = document.getElementById("gallery-item");

    // Generate elements.
    for (let index = 1; index <= size; index++) {

        // Get image URL.
        const imgURL = `${baseURL}/${index}.webp`;

        // Prepare clone.
        const clone = template.content.cloneNode(true);

        // Prepare link.
        const link = clone.querySelector(".gallery-link");
        link.href = imgURL;
        link.addEventListener('click', Lightbox.initialize);

        // Prepare image.
        const img = clone.querySelector('.gallery-img');
        img.src = imgURL;
        img.alt = `Image ${index}`
        
        // Append clone.
        gallery.appendChild(clone);

    }

    // Return success.
    return true;

}

// Initiate generation when ready.
document.addEventListener("DOMContentLoaded", () => {
    generateGallery();
})
