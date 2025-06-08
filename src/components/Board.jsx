import { motion } from 'framer-motion';
import styled from 'styled-components';
import Square from './Square';

const BoardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

export default function Board() {
  return (
    <BoardContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {Array(9).fill(null).map((_, index) => (
        <Square key={index} index={index} />
      ))}
    </BoardContainer>
  );
}