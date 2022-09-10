// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.background};
    font-family: 'Roboto', sans-serif;
  }

  a {
    color: ${props => props.theme.anchor};
  }

  a:hover {
    color: ${props => props.theme.anchorHover};
  }
`;
 
export default GlobalStyle;