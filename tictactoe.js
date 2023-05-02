var turn = "X";
var playedCell = [];
var playedTime = 0;
var playerXWins = 0;
var playerOWins = 0;

// create elements <table> and a <tbody>
var tbl = document.createElement("table");

var tblBody = document.createElement("tbody");

// cells creation
var identifier = 0;
for (var j = 0; j <= 2; j++) {
  // table row creation
  var row = document.createElement("tr");

  for (var i = 0; i <= 2; i++) {
    var cell = document.createElement("td");

    row.appendChild(cell);

    cell.setAttribute("width", 120);
    cell.setAttribute("height", 120);
    cell.setAttribute("align", "center");
    cell.setAttribute("valign", "center");
    cell.addEventListener("click", playTurn);
    cell.identifier = identifier;
    cell.classList.add("cell");
    identifier = identifier + 1;

    cell.style.fontSize = "xxx-large";
    cell.style.backgroundColor = "#DB4169";
    cell.style.border = "2px solid black"
    cell.style.fontFamily = "Permanent Marker"
  }

  //row added to end of table body
  tblBody.appendChild(row);
}

// append the <tbody> inside the <table>
tbl.appendChild(tblBody);
// put <table> in the <body>

document.getElementById("tictactoe").appendChild(tbl);

var resetBtn = document.getElementById("reset-btn");
resetBtn.innerHTML = "Reset";
resetBtn.addEventListener("click", resetGame);

function playTurn() {
  //1 check if the cell has been played before
  if (this.innerHTML === "X" || this.innerHTML === "O") {
    return;
  }

  playedTime = playedTime + 1;
  //2 add the new played tuen to the table playedCell
  playedCell[this.identifier] = turn;
  this.innerHTML = turn;

  //3 check if the game has been won by one of the players
  if (hasWon(turn)) {
    alert("Player: " + turn + " has won the game");
    if (turn === "X") {
      playerXWins++;
      document.getElementById("playerXWins").innerHTML = "Player X:  " + playerXWins;
    } else {
      playerOWins++;
      document.getElementById("playerOWins").innerHTML = "Player Y wins: " + playerOWins;
    }
    init();
  }


  if (turn === "X") {
    turn = "O";
    // if it's Player O's turn, play automatically
    if (playedTime < 9 && turn === "O") {
      // select a random cell that has not been played yet
      var availableCells = getAvailableCells();
      var randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
      // play the turn for Player O on that cell
      document.getElementsByClassName("cell")[randomCell].click();
    }
  } else {
    turn = "X";
  }

  if (playedTime === 9) {
    alert("Draw game");
    init();
  }
}

function getAvailableCells() {
  var availableCells = [];
  for (var i = 0; i < 9; i++) {
    if (!playedCell[i]) {
      availableCells.push(i);
    }
  }
  return availableCells;
}

function hasWon(play) {
  if (
    playedCell[0] === play &&
    playedCell[1] === play &&
    playedCell[2] === play
  ) {
    highlightWinningCells([0, 1, 2]);
    return true;
  }

  if (
    playedCell[3] === play &&
    playedCell[4] === play &&
    playedCell[5] === play
  ) {
    highlightWinningCells([3, 4, 5]);
    return true;
  }
  if (
    playedCell[6] === play &&
    playedCell[7] === play &&
    playedCell[8] === play
  ) {
    highlightWinningCells([6, 7, 8]);
    return true;
  }
  if (
    playedCell[0] === play &&
    playedCell[3] === play &&
    playedCell[6] === play
  ) {
    highlightWinningCells([0, 3, 6]);
    return true;
  }
  if (
    playedCell[1] === play &&
    playedCell[4] === play &&
    playedCell[7] === play
  ) {
    highlightWinningCells([1, 4, 7]);
    return true;
  }
  if (
    playedCell[2] === play &&
    playedCell[5] === play &&
    playedCell[8] === play
  ) {
    highlightWinningCells([2, 5, 8]);
    return true;
  }
  if (
    playedCell[0] === play &&
    playedCell[4] === play &&
    playedCell[8] === play
  ) {
    highlightWinningCells([0, 4, 8]);
    return true;
  }
  if (
    playedCell[2] === play &&
    playedCell[4] === play &&
    playedCell[6] === play
  ) {
    highlightWinningCells([2, 4, 6]);
    return true;
  }

  return false;
}

function highlightWinningCells(cellIndexes) {
  // Add the "win" class to the winning cells
  for (var i = 0; i < cellIndexes.length; i++) {
    var cellIndex = cellIndexes[i];
    var cell = document.getElementsByClassName("cell")[cellIndex];
    cell.classList.add("sell-win");

  }
  setTimeout(function() {
    for (var i = 0; i < cellIndexes.length; i++) {
      var cellIndex = cellIndexes[i];
      var cell = document.getElementsByClassName("cell")[cellIndex];
      cell.classList.remove("sell-win");

    }
  }, 2500);
}



function init() {
  playedTime = 0;
  turn = "X";
  playedCell = [];
  var allCells = document.getElementsByClassName("cell");
  for (let item of allCells) {
    item.innerHTML = "";
  }
}

function resetGame() {
  init();
  document.getElementById("playerXWins").innerHTML = "Player X";
  document.getElementById("playerOWins").innerHTML = "Player Y";
  playerXWins = 0;
  playerOWins = 0;
}
