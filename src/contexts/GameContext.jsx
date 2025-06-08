import { createContext, useContext, useReducer } from 'react';
import { ACTIONS, initialState, calculateWinner } from '../constants/game';
import { lightTheme,darkTheme } from '../styles/theme';

const GameContext = createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE:
      if (state.board[action.index] || state.winner) return state;
      
      const newBoard = [...state.board];
      newBoard[action.index] = state.currentPlayer;
      
      const winner = calculateWinner(newBoard);
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        history: [...state.history, { board: [...state.board], currentPlayer: state.currentPlayer }]
      };
      
    case ACTIONS.UNDO_MOVE:
      if (state.history.length === 0) return state;
      
      const lastState = state.history[state.history.length - 1];
      
      return {
        ...state,
        board: lastState.board,
        currentPlayer: lastState.currentPlayer,
        winner: null,
        history: state.history.slice(0, -1)
      };
      
    case ACTIONS.RESET_GAME:
      return {
        ...initialState,
        isDarkMode: state.isDarkMode
      };
      
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
      
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const theme = state.isDarkMode ? darkTheme : lightTheme;
  
  return (
   <GameContext.Provider value={{ state, dispatch, theme }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}