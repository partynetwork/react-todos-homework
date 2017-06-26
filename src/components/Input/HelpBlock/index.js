import styled from 'styled-components';

// language=SCSS
const HelpBlock = styled.span`
  & {
    font-weight: normal;
    font-size: 0.9rem;
    color: ${props=> props.theme.whiteSmokeColor};
  }
`;

export default HelpBlock
