import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';
import { ACTIONS } from '../constants/game';

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ControlButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.controlBackground};
  color: ${props => props.theme.controlText};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

export default function Controls() {
  const { dispatch } = useGame();

  return (
    <ControlsContainer>
      <ControlButton
        onClick={() => dispatch({ type: ACTIONS.UNDO_MOVE })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Undo Move
      </ControlButton>
      
      <ControlButton
        onClick={() => dispatch({ type: ACTIONS.RESET_GAME })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Game
      </ControlButton>
    </ControlsContainer>
  );
}