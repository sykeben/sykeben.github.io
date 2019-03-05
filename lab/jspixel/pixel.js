var baseURL = "/lab/jspixel/";
var rows = 8; var cols = 8;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function setPixel(x, y, state) {
    if (state) {
        document.getElementById(x+","+y).src = baseURL+"on.png";
    } else {
        document.getElementById(x+","+y).src = baseURL+"off.png";
    }
}

function setRow(y, data) {
    for (var x=0; x<cols; x++) {
        if (data.charAt(x) == "1") {
            setPixel(x, y, true);
        } else {
            setPixel(x, y, false);
        }
    }
}

function setCol(x, data) {
    for (var y=0; y<rows; y++) {
        if (data.charAt(y) == "1") {
            setPixel(x, y, true);
        } else {
            setPixel(x, y, false);
        }
    }
}

function setAll(data) {
    for (var y=0; y<rows; y++) {
        for (var x=0; x<cols; x++) {
            setPixel(x, y, data);
        }
    }
}

function randAll() {
    for (var y=0; y<rows; y++) {
        for (var x=0; x<cols; x++) {
            var randNum = getRandomInt(2);
            if (randNum == 0) {
                setPixel(x, y, false);
            } else {
                setPixel(x, y, true);
            }
        }
    }
}

function pixSetup() {
    var smiley = [];
    smiley[0] = "01111110";
    smiley[1] = "10000001";
    smiley[2] = "10100101";
    smiley[3] = "10000001";
    smiley[4] = "10100101";
    smiley[5] = "10011001";
    smiley[6] = "10000001";
    smiley[7] = "01111110";
    
    for (var y=0; y<8; y++) {
        setRow(y, smiley[y]);
    }
}

window.onload = pixSetup;