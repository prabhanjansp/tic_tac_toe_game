import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// import { lightTheme, darkTheme } from './styles/themes';
import { lightTheme,darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { GameProvider } from './contexts/GameContext';
import { useGame } from './contexts/GameContext';
import Board from './components/Board';
import Controls from './components/Controls';
import ThemeToggle from './components/ThemeToggle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: ${props => props.theme.titleGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Status = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${props => props.theme.statusBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WinnerBanner = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: ${props => props.theme.winnerBackground};
  color: ${props => props.theme.winnerText};
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function Game() {
  const { state ,theme} = useGame();

  const getStatusMessage = () => {
    if (state.winner === 'Draw') return "It's a draw!";
    if (state.winner) return `Player ${state.winner} wins!`;
    return `Next player: ${state.currentPlayer}`;
  };

  return (
<ThemeProvider theme={theme}> {/* Use the theme from context */}
      <GlobalStyles />
      <Container>
        <ThemeToggle />
        
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tic Tac Toe
        </Title>
      
      <Status
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {getStatusMessage()}
      </Status>
      
      <Board />
      <Controls />
      
      <AnimatePresence>
        {state.winner && (
          <WinnerBanner
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {state.winner === 'Draw' ? "Game ended in a draw!" : `Player ${state.winner} wins!`}
          </WinnerBanner>
        )}
      </AnimatePresence>
     </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}