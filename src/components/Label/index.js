import styled from 'styled-components';
import PropTypes from 'prop-types';

const getColor = (props) => {
  let color;
  const {txtStyle} = props;
  switch (txtStyle) {
    case 'primary' :
      color = props.theme.primaryColor;
      break;
    case 'error' :
      color = props.theme.errorColor || '#e21f43';
      break;
    case 'success' :
      color = props.theme.successColor || '#03E461';
      break;
    case 'warning' :
      color = props.theme.warningColor || '#E1BF04';
      break;
    default :
      color = '#36354a';
      break;
  }
  return color;
};

//language=SCSS
const Label = styled.label`
    &{
      color: ${(props)=>getColor(props)};
      font-size: ${(props)=>props.size}rem;
    }
`;

Label.propTypes = {
  txtStyle: PropTypes.string, // error, success, warning
  size: PropTypes.number, // error, success, warning
};
Label.defaultProps = {
  txtStyle: '', // error, success, warning
  size : 1
};
export default Label;
