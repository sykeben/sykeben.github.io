// Playfield Size Definitions
const rows = 6;
const cols = 7;

// Animation Definitions
const genericFadeIn = { easing: "swing", duration: 125, opacity: 1 };
const genericFadeOut = { easing: "swing", duration: 125, opacity: 0 };
const cellFadeOut = { easing: "swing", duration: 200, opacity: 0, borderWidth: "0.625rem" };
const cellFadeIn = { easing: "swing", duration: 200, opacity: 1, borderWidth: "0.125rem" };
const selectNowInvalid = { easing: "swing", duration: 125, opacity: 0.5 };
const selectNowValid = { easing: "swing", duration: 125, opacity: 1 };
const selectClickIn1 = { easing: "swing", duration: 75, opacity: 0.825, rotate: "-5deg" };
const selectClickIn2 = { easing: "swing", duration: 125, opacity: 0.825, rotate: "5deg" };
const selectClickOut = { easing: "swing", duration: 75, opacity: 1, rotate: "0deg" };

// State Initialization
var redTeamTurn = true;
var winFound = false;
var tieFound = false;

// Score Initialization
var redTeamScore = 0;
var blueTeamScore = 0;

// Gameboard Initialization
var gameBoard = new Array(rows);
for (let row = 0; row < rows; row++) {
    gameBoard[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
        gameBoard[row][col] = '-';
    }
}

// Page Setup
$(document).ready(() => {

    // Create the playfield selectors.
    let selConstructor = `<div class="row mb-0 mb-sm-1 mb-lg-3"><div class="col m-0 p-0"></div>`;
    for (let selCol = 0; selCol < cols; selCol++) {
        selConstructor += `<div class="col-1 text-center control p-0 m-1 m-lg-2 shadow-sm" id="select-${selCol}" data-col="${selCol}"></div>`;
    }
    selConstructor += `<div class="col m-0 p-0"></div></div>`;
    $('#playfield').append(selConstructor);

    // Create the playfield cells.
    let constructor = "";
    for (let row = 0; row < rows; row++) {
        constructor = `<div class="row"><div class="col m-0 p-0"></div>`;
        for (let col = 0; col < cols; col++) {
            constructor += `<div class="col-1 text-center cell m-1 m-lg-2 shadow-sm" id="cell-${row}-${col}"></div>`;
        }
        constructor += `<div class="col m-0 p-0"></div></div>`;
        $('#playfield').append(constructor);
    }

    // Create the status message.
    $('#playfield').append(`<div class="mt-3 row"><div class="col text-center turn-status">It is the <span id="turn-team" data-color="r">Red</span> team's turn.</div></div>`);

    // Hook playfield selector events.
    for (let selCol = 0; selCol < cols; selCol++) {
        $(`#select-${selCol}`).click(() => {
            if (!winFound && !tieFound) {
                let result = doMove(selCol);
                updateTurnStatus();
                if (result != -1) checkWin(result, selCol);
                if (winFound || tieFound) showResult();
            } else {
                showResult();
            }
        })
    }

    // Fade in & reset everything.
    setTimeout(() => {
        $("body").animate(genericFadeIn, 325, genericFadeIn.easing);
        reset();
    }, 125);

});

// Turn Status Updater
var lastRedTeamTurn = redTeamTurn;
function updateTurnStatus() {

    // Only update if the turn has changed.
    if (lastRedTeamTurn != redTeamTurn) {

        // Update last value.
        lastRedTeamTurn = redTeamTurn;

        // Perform update.
        $('#turn-team').stop(true).animate(genericFadeOut, 100, genericFadeOut.easing, () => {
            if (redTeamTurn) {
                $("#turn-team").text("Red");
                $("#turn-team").attr("data-color", 'r');
            } else {
                $("#turn-team").text("Blue");
                $("#turn-team").attr("data-color", 'b');
            }
            $('#turn-team').animate(genericFadeIn, 100, genericFadeIn.easing);
        });

    }
}

// Playfield Updater & Animator
function updatePlayfield(row, col) {

    // Only update the field if the data differs.
    if ($(`#cell-${row}-${col}`).attr("data-color") != gameBoard[row][col]) {

        // Update & animate the cell.
        let $thisCell = $(`#cell-${row}-${col}`);
        $thisCell.stop(true).animate(cellFadeOut, cellFadeOut.duration, cellFadeOut.easing, () => {
            $thisCell.attr("data-color", gameBoard[row][col])
            $thisCell.animate(cellFadeIn, cellFadeIn.duration, cellFadeIn.easing);
        });

        // Update & animate the selector.
        let $thisSelect = $(`#select-${col}`);
        $thisSelect.stop(true).animate(selectClickIn1, selectClickIn1.duration, selectClickIn1.easing)
            .animate(selectClickIn2, selectClickIn2.duration, selectClickIn2.easing)
            .animate(selectClickOut, selectClickOut.duration, selectClickOut.easing, () => {
                if (gameBoard[0][col] == 'r' || gameBoard[0][col] == 'b') {
                    $thisSelect.animate(selectNowInvalid, selectNowInvalid.duration, selectNowInvalid.easing);
                } else {
                    if (row == 0) $thisSelect.animate(selectNowValid, selectNowValid.duration, selectNowValid.easing);
                }
            });

    }

}

// Move Performer
function doMove(loc) {

    // Only perform the move if the location isn't full.
    if (gameBoard[0][loc] != 'r' && gameBoard[0][loc] != 'b') {

        // Location has space, perform move.
        for (let row = rows-1; row >= 0; row--) {
            if (gameBoard[row][loc] != 'r' && gameBoard[row][loc] != 'b') {
                gameBoard[row][loc] = redTeamTurn ? 'r' : 'b';
                updatePlayfield(row, loc);
                redTeamTurn = !redTeamTurn;
                return row;
            }
        }

    } else {

        // Location full, return invalid code.
        return -1;

    }

}

// Win Checker
function checkWin(row, col) {

    // Combine into individual values.
    let rowValues = "";
    let colValues = "";
    let diagValues = "";
    let flippedDiagValues = "";
    for (let offset = -3; offset <= 3; offset++) {

        // Calculate offsets.
        let offsetRow = row + offset;
        let offsetCol = col + offset;
        let offsetColFlipped = col - offset;

        // Determine validity.
        let rowValid = (offsetRow >= 0) && (offsetRow < rows);
        let colValid = (offsetCol >= 0) && (offsetCol < cols);
        let colFlippedValid = (offsetColFlipped >= 0) && (offsetColFlipped < cols);

        // Combine values.
        if (rowValid) { rowValues += gameBoard[offsetRow][col]; }
        if (colValid) { colValues += gameBoard[row][offsetCol]; }
        if (rowValid && colValid) { diagValues += gameBoard[offsetRow][offsetCol]; }
        if (rowValid && colFlippedValid) { flippedDiagValues += gameBoard[offsetRow][offsetColFlipped]; }

    }

    // Combine values.
    let winValuesCombined = "";
    winValuesCombined += "{" + rowValues + "}";
    winValuesCombined += "{" + colValues + "}";
    winValuesCombined += "{" + diagValues + "}";
    winValuesCombined += "{" + flippedDiagValues + "}";
    let tieValuesCombined = ""; for (let col = 0; col < cols; col++) tieValuesCombined += gameBoard[0][col];

    // Check if it was a win.
    if (winValuesCombined.includes("rrrr") || winValuesCombined.includes("bbbb")) {
        if (winValuesCombined.includes("rrrr")) { redTeamScore++; }
        if (winValuesCombined.includes("bbbb")) { blueTeamScore++; }
        winFound = true;
    } else {
        winFound = false;
    }

    // Check if it was a tie.
    if (!tieValuesCombined.includes("-") && !winFound) {
        redTeamScore++; blueTeamScore++;
        tieFound = true;
    } else {
        tieFound = false;
    }

}

// Result Modal Shower
function showResult() {

    // Clear the previous modal.
    $('#modal').empty();

    // Create the modal content.
    let constructor = "";
    constructor += `<div class="modal-dialog mt-3 mt-sm-4 mt-md-5"><div class="modal-content">`;
    constructor += `<div class="modal-header"><h5 class="modal-title" id="modalLabel">Game Over</h5></div><div class="modal-body text-center">`;
    if (winFound) { constructor += `<p>The <span id="winning-team" data-color="${!redTeamTurn?'r':'b'}">${!redTeamTurn?"Red":"Blue"}</span> team has won!</p>`; }
    else if (tieFound) { constructor += `<p>It was a tie!</p>`; }
    else { constructor += `<p>This shouldn't have been shown...</p>`; }
    constructor += `<p>Scores - Red: ${redTeamScore}, Blue: ${blueTeamScore}</p>`;
    constructor += `</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Play Again</button></div>`
    constructor += `</div></div>`;
    $('#modal').append(constructor);

    // Show it & bind events (after a delay).
    setTimeout(() => {
        let modalElement = document.getElementById("modal");
        let modal = new bootstrap.Modal(modalElement);
        modal.show();
        modalElement.addEventListener("hidden.bs.modal", () => {
            $('body').stop(true).animate(genericFadeOut, 250, genericFadeOut.easing, () => {
                reset();
                $('body').delay(250).animate(genericFadeIn, 250, genericFadeIn.easing);
            });
        });
    }, 125);

}

// Game Resetter
function reset() {

    // Reset states.
    redTeamTurn = true;
    lastRedTeamTurn = !redTeamTurn;
    winFound = false;
    tieFound = false;

    // Reset gameBoard data & playfield.
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            gameBoard[row][col] = '-';
            let nowRow = row;
            let nowCol = col;
            setTimeout(() => updatePlayfield(nowRow, nowCol), nowCol*(150/cols) + nowRow*150);
        }
    }

    // Reset turn status.
    updateTurnStatus();

}