const board = document.querySelector(".board");

const currentPlayer = document.querySelector("#player");
const startbutton = document.querySelector(".btn-start");
const stopbutton = document.querySelector(".btn-stop");

//Create squares for the board
for (let i = 0; i < 49; i++) {
  let div = document.createElement("div");
  div.setAttribute("id", i);
  board.appendChild(div);
}

let squares = Array.from(document.querySelectorAll(".board div"));
const width = 7;
const players = {
  red: {
    name: 'red',
    score: document.querySelector('#red')
  },
  yellow: {
    name: 'yellow',
    score: document.querySelector('#yellow')
  }
};

let currentSquare = 0;
let time;

function gameOn() {
  //activate board
  squares.forEach(square => {
    square.style.cursor = "pointer";
    square.addEventListener("click", placePiece);
  });
  startbutton.disabled = true;
  //show the player
  currentPlayer.innerHTML = players['red'].name;
  currentPlayer.style.color = players['red'].name;
}

function gameOver() {
  squares.forEach(square => {    //disable the board
    square.style.cursor = "not-allowed";
    square.removeEventListener("click", placePiece);

    for(let player in players){      //clear the board
      square.classList.remove(player);
      square.classList.remove("taken");
      square.style.backgroundColor = "";
    }

  });
  startbutton.disabled = false;
  currentPlayer.innerHTML = "";
}

function checkWinner() {
  //Check Lines
  for (let row = 0; row < 43; row += 7) {
    for (let column = row; column < row + (width - 3); column++) {
      if (
        squares[column].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 1].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 2].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 3].classList.contains(currentPlayer.innerHTML)
      ) {
        return true;
      }
    }
  }
  //check Columns
  for (let column = 0; column < width; column++) {
    for (let row = column; row < column + width * 3 + 1; row += 7) {
      if (
        squares[row].classList.contains(currentPlayer.innerHTML) &&
        squares[row + 7].classList.contains(currentPlayer.innerHTML) &&
        squares[row + 14].classList.contains(currentPlayer.innerHTML) &&
        squares[row + 21].classList.contains(currentPlayer.innerHTML)
      ) {
        return true;
      }
    }
  }
  //diagonal left to right
  for (let row = 0; row < 25 ; row += 7) {
    for (let column = row; column < row + (width - 3); column++) {
      if (
        squares[column].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 8].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 16].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 24].classList.contains(currentPlayer.innerHTML)
      ) {
        return true;
      }
    }
  }

  //diagonal right to left
  for (let row = 3; row < 28 ; row += 7) {
    for (let column = row; column < row + (width - 3); column++) {
      if (
        squares[column].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 6].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 12].classList.contains(currentPlayer.innerHTML) &&
        squares[column + 18].classList.contains(currentPlayer.innerHTML)
      ) {
        return true;
      }
    }
  }
}

function nextPlayer() {
  if (currentPlayer.innerHTML === "yellow") {
    currentPlayer.innerHTML = players['red'].name;
    currentPlayer.style.color = players['red'].name;
  } else {
    currentPlayer.innerHTML = players['yellow'].name;
    currentPlayer.style.color = players['yellow'].name;
  }
}

function move() {
  if (!isLastRow() && !isFilled(Number(currentSquare) + width)) {
    undraw();
    currentSquare = Number(currentSquare) + width;
    draw();
  } else {
    clearInterval(time);
    if (checkWinner()) {
      alert(currentPlayer.innerHTML + ' is the winner');
      players[currentPlayer.innerHTML].score.innerHTML++
      gameOver();
    } else {
      nextPlayer();
    }
  }
}

function undraw() {
  squares[currentSquare].classList.remove(currentPlayer.innerHTML);
  squares[currentSquare].classList.remove("taken");
  squares[currentSquare].style.backgroundColor = "";
}

function draw() {
  squares[currentSquare].classList.add(currentPlayer.innerHTML);
  squares[currentSquare].classList.add("taken");
  squares[currentSquare].style.backgroundColor = currentPlayer.innerHTML;
}

function isFilled(square) {
  if (squares[square].classList.contains("taken")) {
    return true;
  }
  return false;
}

function isLastRow() {
  if (currentSquare > 41) {
    return true;
  }
  return false;
}

function placePiece() {
  currentSquare = this.id;
  if (!isFilled(currentSquare)) {
    draw();
    time = setInterval(move, 20);
  }
}

startbutton.addEventListener("click", gameOn);
stopbutton.addEventListener("click", gameOver);
