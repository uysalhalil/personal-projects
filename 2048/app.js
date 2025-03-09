document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squares = [];
  let score = 0;

  // create the playing board
  function createBoard() {
    for (let i = 0; i < width * width; ++i) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
    addColors();
  }
  createBoard();

  // generate a new number
  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      // check for game over
    } else {
      generate();
    }
    checkGameOver();
  }

  //   move board
  function moveHorizontal(direction) {
    for (let i = 0; i < width * width; i += width) {
      let row = [];
      for (let j = 0; j < width; ++j) {
        row.push(parseInt(squares[i + j].innerHTML));
      }

      let filteredRow = row.filter((num) => num);
      let missing = width - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = [];
      if (direction === 0) {
        newRow = zeros.concat(filteredRow);
      } else {
        newRow = filteredRow.concat(zeros);
      }
      for (let j = 0; j < width; ++j) {
        squares[i + j].innerHTML = newRow[j];
      }
    }
  }

  function moveVertical(direction) {
    for (let i = 0; i < width; ++i) {
      let col = [];
      for (let j = 0; j < width * width; j += width) {
        col.push(parseInt(squares[i + j].innerHTML));
      }

      let filteredCol = col.filter((num) => num);
      let missing = width - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newCol = [];
      if (direction === 0) {
        newCol = zeros.concat(filteredCol);
      } else {
        newCol = filteredCol.concat(zeros);
      }
      for (let j = 0, k = 0; j < width * width && k < width; j += width, ++k) {
        squares[i + j].innerHTML = newCol[k];
      }
    }
  }

  function combine(direction) {
    let step = 0;
    if (direction === 0) {
      step = 1;
    } else {
      step = width;
    }
    for (let i = 0; i < width * width - step; ++i) {
      if (squares[i].innerHTML === squares[i + step].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + step].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + step].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    // check for win
  }

  // assign functions to the keys
  function control(e) {
    if (e.key === "ArrowLeft") {
      keyLeft();
    } else if (e.key === "ArrowRight") {
      keyRight();
    } else if (e.key === "ArrowUp") {
      keyUp();
    } else if (e.key === "ArrowDown") {
      keyDown();
    }
    addColors();
  }

  document.addEventListener("keydown", control);

  function keyRight() {
    moveHorizontal(0);
    combine(0);
    moveHorizontal(0);
    generate();
  }

  function keyLeft() {
    moveHorizontal(1);
    combine(0);
    moveHorizontal(1);
    generate();
  }

  function keyDown() {
    moveVertical(0);
    combine(1);
    moveVertical(0);
    generate();
  }

  function keyUp() {
    moveVertical(1);
    combine(1);
    moveVertical(1);
    generate();
  }

  function checkGameOver() {
    zeros = 0;
    for (let i = 0; i < width * width; ++i) {
      if (parseInt(squares[i].innerHTML) == 0) {
        ++zeros;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "Game over mate!";
      document.removeEventListener("keydown", control);
    }
  }

  // add colors
  function addColors() {
    for (let i = 0; i < squares.length; ++i) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#ffcea4";
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#e8c064";
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#ffab6e";
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#fd9982";
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#ead79c";
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#76daff";
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#beeaa5";
      else squares[i].style.backgroundColor = "#d7d4f0";
    }
  }
});
