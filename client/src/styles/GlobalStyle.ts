import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fafafa;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .grid {
    display: grid;
    gap: 20px;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
    
    .grid-2, .grid-3, .grid-4 {
      grid-template-columns: 1fr;
    }
  }
`;

export const colors = {
  primary: '#228B22', // Forest Green
  secondary: '#FFD700', // Gold
  accent: '#DC143C', // Crimson Red
  dark: '#2F2F2F', // Dark Gray
  light: '#F5F5F5', // Light Gray
  white: '#FFFFFF',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8'
};