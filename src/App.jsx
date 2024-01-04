import { useState } from "react";

// Square is a functional component that renders a button.
// It takes two props: value (X, O, or null) and onSquareClick, a function that is triggered on click.
function Square({ value, onSquareClick }) {
  return (
    // The button displays the value and calls onSquareClick when clicked.
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board is the main component that renders the 3x3 tic-tac-toe board.
export default function Board() {
  // xisNext is a state variable that determines whether the next move is 'X'. It's initially true.
  const [xisNext, setXisNext] = useState(true);
  // squares is a state array representing the 9 squares of the board, initially all null.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // handleClick is called when any square is clicked.
  function handleClick(i) {
    // If the clicked square is already filled or if there's a winner, do nothing.
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Create a copy of the squares array to avoid direct mutation.
    const nextSquares = squares.slice();
    // Set the clicked square to 'X' or 'O' based on xisNext.
    nextSquares[i] = xisNext ? "X" : "O";
    // Update the squares state and toggle xisNext.
    setSquares(nextSquares);
    setXisNext(!xisNext);
  }

  // Check for a winner.
  const winner = calculateWinner(squares);
  let status;
  // Display the winner or the next player.
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player:" + (xisNext ? "X" : "O");
  }

  // Render the board with the status and 9 squares.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* Render each square, passing the value and the handleClick function */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      {/* Similar rendering for other rows */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// calculateWinner checks if there is a winner in the current board state.
function calculateWinner(squares) {
  // Pre-defined combinations of indices that make a win.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Iterate over the lines to check for a winning combination.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if the squares at these indices have the same non-null value.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Return null if no winner is found.
  return null;
}
