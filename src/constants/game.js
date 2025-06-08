export const ACTIONS = {
  MAKE_MOVE: 'make-move',
  UNDO_MOVE: 'undo-move',
  RESET_GAME: 'reset-game',
  TOGGLE_THEME: 'toggle-theme'
};

export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  history: [],
  isDarkMode: false
};

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(square => square !== null)) return 'Draw';
  return null;
};