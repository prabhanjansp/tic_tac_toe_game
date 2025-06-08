import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';
import { ACTIONS } from '../constants/game';

const ThemeButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.theme.toggleBackground};
  color: ${props => props.theme.toggleText};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

export default function ThemeToggle() {
  const { state, dispatch } = useGame();

  return (
    <ThemeButton
      onClick={() => dispatch({ type: ACTIONS.TOGGLE_THEME })}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {state.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </ThemeButton>
  );
}