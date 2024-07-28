import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #8A2BE2;
    --secondary-color: #4B0082;
    --background-color: #0F0F1A;
    --text-color: #E0E0E0;
    --input-background: rgba(255, 255, 255, 0.1);
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

// Удаляем этот комментарий и дополнительный экспорт
// // Изменяем экспорт по умолчанию на именованный экспорт
// // export default GlobalStyle;
// export { GlobalStyle };