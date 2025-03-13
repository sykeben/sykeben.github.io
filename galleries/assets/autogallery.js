'use strict';

// Generates a gallery on the page using "data-gallery-*" attributes.
function generateGallery() {

    // Get elements.
    const grid = document.getElementById("gallery-grid");
    const template = document.getElementById("gallery-item");

    // Get attributes.
    const size = parseInt(grid.getAttribute("data-gallery-size"), 10);

    // Get base URL.
    const baseURL = 'assets';

    // Track loaded images.
    let loadedImages = 0;

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

        // Ensure images load before initializing Masonry.
        img.onload = () => {
            loadedImages++;
            if (loadedImages === size) {
                const masonry = new Masonry('#gallery-grid', { itemSelector: '.col', percentPosition: true });
                masonry.layout();
            }
        };
        
        // Append clone.
        grid.appendChild(clone);

    }

    // Return success.
    return true;

}

// Initiate generation when ready.
document.addEventListener("DOMContentLoaded", () => {
    generateGallery();
})
