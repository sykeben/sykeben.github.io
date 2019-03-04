function initAll() {
    hideAll();
    initCarousel();
    $("#stepText0").removeClass("hidden");
    document.getElementById("stepCount").innerHTML = $(".carousel-item").length;
    setSlideNumber(Cookies.get("slideNumber"));
}

function initCarousel() {
    $("#stepCarousel").on("slide.bs.carousel", function() {
        hideAll(); 
    });
    
    $("#stepCarousel").on("slid.bs.carousel", function() {
        showProper();
        var currentIndex = $("div.active").index();
        Cookies.set("slideNumber", currentIndex, { expires: 10, path:"" });
    });
}

function hideAll() {
    for (var i=0; i<document.getElementsByClassName("stepText").length; i++) {
        $("#stepText"+i.toString()).addClass("hidden");
    }
}

function showProper() {
    var currentIndex = $("div.active").index();
    $("#stepText"+currentIndex.toString()).removeClass("hidden");
    document.getElementById("stepNumber").innerHTML = (currentIndex+1).toString();
}

function setSlideNumber(slideNumber) {
    if (!isNaN(slideNumber)) {
        $("#stepCarousel").carousel(parseInt(slideNumber));
    }
}

function carPrev() {
    $("#stepCarousel").carousel("prev");
}

function carNext() {
    $("#stepCarousel").carousel("next");
}

var keypressFunctions = [];
keypressFunctions[37] = carPrev; // Left
keypressFunctions[39] = carNext; // Right

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            // Left
            carPrev();
        case 39:
            // Right
            carNext();
    };
};

window.onload = initAll;