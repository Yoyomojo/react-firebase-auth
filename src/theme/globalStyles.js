// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    background: #FFF;
    font-family: 'Roboto', sans-serif;
  }
`;
 
export default GlobalStyle;