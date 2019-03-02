function initAll() {
    hideAll();
    initCarousel();
    $("#stepText0").removeClass("hidden");
}

function initCarousel() {
    $("#stepCarousel").on("slide.bs.carousel", function() {
        hideAll(); 
    });
    
    $("#stepCarousel").on("slid.bs.carousel", function() {
        var currentIndex = $("div.active").index();
        $("#stepText"+currentIndex.toString()).removeClass("hidden");
        document.getElementById("stepNumber").innerHTML = (currentIndex+1).toString();
    });
}

function hideAll() {
    for (var i=0; i<document.getElementsByClassName("stepText").length; i++) {
        $("#stepText"+i.toString()).addClass("hidden");
    }
}

function carPrev() {
    $("#stepCarousel").carousel("prev");
}

function carNext() {
    $("#stepCarousel").carousel("next");
}

window.onload = initAll;