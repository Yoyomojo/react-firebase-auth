import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: #FFF;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-25px;
  margin-left: -25px;
`;

export default Loader;