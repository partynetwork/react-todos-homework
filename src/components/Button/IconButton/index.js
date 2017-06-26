import styled from 'styled-components';

//language=SCSS prefix=&{ suffix=}
const IconButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    &:focus{
      outline: none;
    }
    &:hover {
      background-color: rgba(200,200,200,.6);
    }
    
    i {
      vertical-align: middle;
    }
`;
export default IconButton;