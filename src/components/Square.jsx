import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';

const SquareButton = styled(motion.button)`
  width: 80px;
  height: 80px;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: ${props => props.theme.squareBackground};
  color: ${props => props.value === 'X' ? props.theme.xColor : props.value === 'O' ? props.theme.oColor : props.theme.squareText};
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }
`;

export default function Square({ index }) {
  const { state, dispatch } = useGame();
  const value = state.board[index];

  return (
    <SquareButton
      value={value}
      onClick={() => dispatch({ type: 'make-move', index })}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value}
    </SquareButton>
  );
}