import styled from 'styled-components';

// language=SCSS
const HelpBlock = styled.span`
  & {
    position: absolute;
    bottom:0;
    left: 0;
    font-weight: normal;
    font-size: 0.9rem;
    line-height: 0.9rem;
    transition: opacity 3s linear;
  }
`;

export default HelpBlock
