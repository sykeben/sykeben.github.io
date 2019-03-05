var facts = [];
facts[0] = "You can use <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> to change slides while viewing a tutorial.";
facts[1] = "This whole website is being hosted using GitHub Pages.";
facts[2] = "I taught myself HTML, CSS, JS, and Bootstrap!";
facts[3] = "Most of the code to make the tutorials work was written by me."
facts[4] = "These facts are randomized by a script I wrote."
facts[5] = "HTML stands for <strong>H</strong>yper<strong>t</strong>ext <strong>M</strong>arkup <strong>L</strong>anguage."

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function pickFact() {
    document.getElementById("coolFact").innerHTML = facts[getRandomInt(facts.length)];
}

window.onload = pickFact;