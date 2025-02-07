'use strict';

// Generates a gallery on the page using "data-gallery-*" attributes.
function generateGallery() {

    // Get elements.
    const gallery = document.getElementById("gallery");
    const template = document.getElementById("gallery-item");

    // Get attributes.
    const set = gallery.getAttribute("data-gallery-set").replace(/[^\w]/g, "-");
    const size = parseInt(gallery.getAttribute("data-gallery-size"), 10);

    // Get base URL.
    const baseURL = `assets/sets/${set}`;

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
        img.id = `img-${index}`;
        img.alt = `Image ${index}`;
        
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
