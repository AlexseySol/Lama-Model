import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #2A2A3A 0%, #1A1A2A 100%);
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.h2`
  color: #8A2BE2;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

const ModalText = styled.p`
  color: #E0E0E0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #8A2BE2;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #9B59B6;
  }
`;

const ActionButton = styled(motion.button)`
  background-color: #8A2BE2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
  
  &:hover {
    background-color: #9B59B6;
  }
`;

function Modal({ onClose }) {
  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContent
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
          <ModalHeader>Помилка реєстрації</ModalHeader>
          <ModalText>
         Вибачте але нажаль вам постійно мерещіться ШІ. Тому вам доступ зачинено          </ModalText>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Зрозуміло
          </ActionButton>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
}

export default Modal;