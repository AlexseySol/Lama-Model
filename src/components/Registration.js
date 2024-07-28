import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import {
  StyledForm,
  InputWrapper,
  StyledIcon,
  Input,
  Button,
  Message,
  Title,
  Tooltip
} from '../styles/RegistrationStyles';

function Registration({ onAuthentication }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    anime({
      targets: 'input, button',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .8)',
      duration: 1500
    });
  }, []);

  const validateForm = () => {
    if (!firstName.trim()) {
      setError("Будь ласка, введіть ім'я.");
      return false;
    }
    if (!lastName.trim()) {
      setError('Будь ласка, введіть прізвище.');
      return false;
    }
    if (!phone.trim()) {
      setError('Будь ласка, введіть номер телефону.');
      return false;
    }
    if (!/^\+?[0-9]{10,13}$/.test(phone.replace(/\s+/g, ''))) {
      setError('Будь ласка, введіть коректний номер телефону.');
      return false;
    }
    if (!email.trim()) {
      setError('Будь ласка, введіть email.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Будь ласка, введіть коректний email.');
      return false;
    }
    return true;
  };

  const checkForbiddenData = () => {
    const normalizedLastName = lastName.toLowerCase().replace(/[^a-zа-яё]/g, '');
    const normalizedEmail = email.toLowerCase();
    const normalizedPhone = phone.replace(/\s+/g, '');
    
    const forbiddenLastName = 'капустин';
    const forbiddenEmail = 'skayter96@gmail.com';
    const forbiddenPhones = ['+380994073859', '+4916091466572'];
    
    return (
      normalizedLastName.includes(forbiddenLastName) ||
      normalizedEmail === forbiddenEmail ||
      forbiddenPhones.includes(normalizedPhone)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    if (checkForbiddenData()) {
      setShowModal(true);
      return;
    }

    const message = `Ім'я: ${firstName}\nПрізвище: ${lastName}\nEmail: ${email}\nНомер телефону: ${phone}`;
    const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
    const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

    try {
      const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });

      if (response.status === 200) {
        setSuccess(true);
        onAuthentication({ firstName, lastName, email, phone });
      } else {
        setError('Помилка при відправці даних у Telegram.');
      }
    } catch (error) {
      console.error('Помилка при відправці даних у Telegram:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      setError('Помилка при відправці даних у Telegram. Будь ласка, спробуйте ще раз пізніше.');
    }
  };

  return (
    <StyledForm
      onSubmit={handleSubmit}
      as={motion.form}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Реєстрація</Title>
      <AnimatePresence>
        {error && (
          <Message
            as={motion.p}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(255, 0, 0, 0.2)' }}
          >
            {error}
          </Message>
        )}
        {success && (
          <Message
            as={motion.p}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(0, 255, 0, 0.2)' }}
          >
            Дані успішно відправлені!
          </Message>
        )}
      </AnimatePresence>
      <InputWrapper>
        <StyledIcon><FaUser /></StyledIcon>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Ім'я"
          required
        />
      </InputWrapper>
      <InputWrapper>
        <StyledIcon><FaUser /></StyledIcon>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Прізвище"
          required
        />
      </InputWrapper>
      <InputWrapper>
        <StyledIcon><FaPhone /></StyledIcon>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Номер телефону"
          required
        />
        <Tooltip>Введіть номер телефону у форматі +380XXXXXXXXX</Tooltip>
      </InputWrapper>
      <InputWrapper>
        <StyledIcon><FaEnvelope /></StyledIcon>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Tooltip>Введіть дійсну email адресу</Tooltip>
      </InputWrapper>
      <Button
        as={motion.button}
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Зареєструватися
      </Button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </StyledForm>
  );
}

export default Registration;
