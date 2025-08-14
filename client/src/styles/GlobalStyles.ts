import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-green: #00ff88;
    --primary-green-dark: #00cc6a;
    --primary-green-light: #33ff9e;
    --dark-bg: #1a1a1a;
    --dark-bg-secondary: #2a2a2a;
    --dark-bg-tertiary: #333333;
    --white: #ffffff;
    --gray-light: #f5f5f5;
    --gray: #cccccc;
    --gray-dark: #666666;
    --red: #ff4444;
    --yellow: #ffaa00;
    --blue: #0066ff;
    
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Inter', sans-serif;
    
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
    --shadow-green: 0 4px 20px rgba(0, 255, 136, 0.3);
    
    --border-radius: 8px;
    --border-radius-lg: 16px;
    --border-radius-xl: 24px;
    
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: var(--font-primary);
    background-color: var(--dark-bg);
    color: var(--white);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
  }

  h4 {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
  }

  p {
    font-family: var(--font-secondary);
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.7;
  }

  a {
    color: var(--primary-green);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-green-light);
    }
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    outline: none;
    transition: var(--transition);
  }

  input, textarea, select {
    font-family: var(--font-secondary);
    outline: none;
    transition: var(--transition);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--dark-bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-green);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-green-dark);
  }

  /* Selection */
  ::selection {
    background: var(--primary-green);
    color: var(--dark-bg);
  }

  /* Focus styles */
  *:focus {
    outline: 2px solid var(--primary-green);
    outline-offset: 2px;
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-green {
    color: var(--primary-green);
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 3rem; }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 3rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }
  .p-5 { padding: 3rem; }

  /* Responsive utilities */
  @media (max-width: 768px) {
    .container {
      padding: 0 0.75rem;
    }
    
    h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }
    
    h2 {
      font-size: clamp(1.5rem, 5vw, 2.5rem);
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 0.5rem;
    }
  }
`; 