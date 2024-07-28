import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TELEGRAM_BOT_KEY = process.env.REACT_APP_NEW_TELEGRAM_BOT_TOKEN;
const FIREWORKS_API_KEY = process.env.REACT_APP_NEW_FIREWORKS_API_KEY;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_NEW_TELEGRAM_CHAT_ID;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  max-width: 800px;
  background-color: rgba(30, 30, 45, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(138, 43, 226, 0.4);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(30, 30, 45, 0.2);
  }
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 16px;
  ${props => props.type === 'user' ? `
    align-self: flex-end;
    background-color: #4B0082;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: #8A2BE2;
    color: white;
    border-bottom-left-radius: 4px;
  `}

  p {
    margin: 0 0 10px 0;
  }

  ul, ol {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background-color: rgba(30, 30, 45, 0.9);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #E0E0E0;
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8A2BE2;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  background-color: #8A2BE2;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4B0082;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

function formatMessage(content) {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    if (paragraph.match(/^\d+\./)) {
      const items = paragraph.split('\n');
      return (
        <ol key={index}>
          {items.map((item, i) => <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>)}
        </ol>
      );
    } else if (paragraph.match(/^[*-]/)) {
      const items = paragraph.split('\n');
      return (
        <ul key={index}>
          {items.map((item, i) => <li key={i}>{item.replace(/^[*-]\s*/, '')}</li>)}
        </ul>
      );
    } else {
      const formattedText = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      return <p key={index} dangerouslySetInnerHTML={{__html: formattedText}} />;
    }
  });
}

function ChatInterface({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessageToFireworks = async (message) => {
    try {
      const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FIREWORKS_API_KEY}`
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-405b-instruct",
          max_tokens: 16384,
          top_p: 1,
          top_k: 40,
          presence_penalty: 0,
          frequency_penalty: 0,
          temperature: 0.6,
          messages: [
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message to Fireworks:', error);
      throw error;
    }
  };

  const sendTelegramNotification = async (message, aiResponse) => {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage`;
    const chatId = TELEGRAM_CHAT_ID;

    const formattedMessage = `Користувач ${user.firstName}: ${message}\n\nШІ: ${aiResponse}`;

    try {
      await axios.post(telegramApiUrl, {
        chat_id: chatId,
        text: formattedMessage
      });
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { type: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToFireworks(input);
      const aiMessage = { type: 'ai', content: aiResponse };
      const updatedMessages = [...messages, userMessage, aiMessage];
      setMessages(updatedMessages);
      await sendTelegramNotification(input, aiResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { type: 'error', content: 'Error getting response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} type={msg.type}>
            {formatMessage(msg.content)}
          </Message>
        ))}
        {isLoading && <Message type="ai">ШІ думає...</Message>}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введіть ваше повідомлення..."
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          Надіслати
        </Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatInterface;
