import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main Container for TicTacToe Classic game.
 * Implements minimalist two-player mode, win/draw detection, and board reset.
 */
const BOARD_SIZE = 3;
const INITIAL_BOARD = Array(BOARD_SIZE * BOARD_SIZE).fill(null);

const COLORS = {
  primary: "#625e9c",
  secondary: "#000000",
  accent: "#1ff454",
  background: "#fff",
  grid: "#dedede",
  cell: "#faf9ff"
};

// Helper for all winning line combinations
const WIN_LINES = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

// PUBLIC_INTERFACE
/**
 * Detects and returns a winner symbol ("X" or "O") or null if none.
 **/
function calculateWinner(board) {
  for (let line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export default function TicTacToeMain() {
  // Game state
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);

  const winner = calculateWinner(board);
  const isDraw = !winner && moveCount === BOARD_SIZE * BOARD_SIZE;

  // Returns "Player 1", "Player 2", or null
  function playerLabel(mark) {
    return mark === "X" ? "Player 1" : (mark === "O" ? "Player 2" : null);
  }

  // Handle clicking a cell
  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Ignore if occupied or game ended
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
    setMoveCount(moveCount + 1);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(INITIAL_BOARD);
    setXIsNext(true);
    setMoveCount(0);
  }

  // Render one cell
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        style={{
          color: board[idx] === "X" ? COLORS.primary : (board[idx] === "O" ? COLORS.accent : COLORS.secondary),
          background: COLORS.cell,
          borderColor: COLORS.grid,
          cursor: board[idx] || winner ? "default" : "pointer",
        }}
        onClick={() => handleCellClick(idx)}
        aria-label={board[idx] ? board[idx] : "Empty"}
        key={idx}
        disabled={!!board[idx] || !!winner}
      >
        {board[idx]}
      </button>
    );
  }

  // Game status heading
  let status;
  if (winner) {
    status = (
      <span>
        <span style={{ color: winner === "X" ? COLORS.primary : COLORS.accent, fontWeight: 600 }}>
          {playerLabel(winner)}
        </span>{" "}
        wins!
      </span>
    );
  } else if (isDraw) {
    status = <span style={{ color: COLORS.secondary, fontWeight: 600 }}>It's a draw!</span>;
  } else {
    status = (
      <span>
        Turn: <span style={{ color: xIsNext ? COLORS.primary : COLORS.accent, fontWeight: 600 }}>
          {xIsNext ? "Player 1 (X)" : "Player 2 (O)"}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-outer" style={outerStyles}>
      <div className="ttt-heading" style={headingStyles}>
        <h2
          style={{
            margin: 0,
            fontWeight: 700,
            color: COLORS.primary,
            fontSize: "2rem",
            letterSpacing: "0.05em"
          }}
        >
          TicTacToe Classic
        </h2>
        <div className="ttt-status" style={{
          marginTop: "10px",
          fontSize: "1.15rem",
          minHeight: "32px"
        }}>
          {status}
        </div>
      </div>
      <div
        className="ttt-board"
        style={boardStyles}
        role="grid"
        aria-label="Tic Tac Toe Board"
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => renderCell(idx))}
      </div>
      <button
        className="ttt-reset-button"
        style={resetBtnStyles}
        onClick={handleRestart}
      >
        Restart Game
      </button>
      <div style={{ marginTop: "14px", fontSize: "0.95rem", color: COLORS.secondary, opacity: 0.5 }}>
        Two Player | Minimalist | Kavia Demo
      </div>
      {/* Inline CSS for grid, cells: minimalist, responsive, light theme */}
      <style>{`
        .ttt-outer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: ${COLORS.background};
          padding: 48px 20px 30px 20px;
          border-radius: 18px;
          box-shadow: 0 2px 12px 0 rgba(150,100,255,0.08);
          min-width: 320px;
        }
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 70px);
          grid-template-rows: repeat(3, 70px);
          gap: 8px;
          justify-content: center;
          align-items: center;
          background: #f9f8fe;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 #eee;
          margin: 16px 0 0 0;
        }
        .ttt-cell {
          width: 68px;
          height: 68px;
          font-size: 2.3rem;
          font-family: inherit;
          border: 2px solid ${COLORS.grid};
          border-radius: 8px;
          background: ${COLORS.cell};
          transition: background 0.18s, border 0.16s;
          outline: none;
        }
        .ttt-cell:active:not(:disabled) {
          background: #efeefd;
        }
        .ttt-cell:disabled {
          opacity: 0.65;
        }
        .ttt-reset-button {
          margin-top: 20px;
          background: ${COLORS.primary};
          color: #fff;
          padding: 12px 32px;
          border: none;
          border-radius: 7px;
          font-size: 1.08rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.18s;
        }
        .ttt-reset-button:hover {
          background: ${COLORS.accent};
          color: ${COLORS.secondary};
        }
        @media (max-width: 520px) {
          .ttt-board {
            grid-template-columns: repeat(3, 46px);
            grid-template-rows: repeat(3, 46px);
          }
          .ttt-cell {
            width: 44px;
            height: 44px;
            font-size: 1.4rem;
          }
          .ttt-outer {
            min-width: unset;
            padding: 24px 4vw 10vw 4vw;
          }
        }
      `}</style>
    </div>
  );
}

const outerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: COLORS.background,
  margin: "auto",
  marginTop: "24px",
  padding: "48px 16px",
  borderRadius: "18px",
  minWidth: "320px",
  maxWidth: "380px",
  boxShadow: "0 2px 12px 0 rgba(150,100,255,0.08)"
};

const headingStyles = {
  textAlign: "center",
  width: "100%",
  marginBottom: "8px"
};

const boardStyles = {
  margin: "auto"
};

const resetBtnStyles = {
  background: COLORS.primary,
  color: COLORS.background,
  padding: "12px 32px",
  border: "none",
  borderRadius: "7px",
  fontSize: "1.1rem",
  fontWeight: 500,
  cursor: "pointer",
  marginTop: "16px"
};
