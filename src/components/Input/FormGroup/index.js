import styled from 'styled-components';
import PropTypes from 'prop-types';

// language=SCSS
const FormGroup = styled.div`
  & {
    margin: 0.8em 0;
    
    position: relative;
    padding-bottom: 25px;
    span{
      color: ${props=> { if(props.display) { return props.theme[props.display+'Color'];} else { return 'inherit'} }  } !important;
    }
  }
`;


FormGroup.propTypes = {
  display: PropTypes.oneOf(['primary', 'success', 'error', 'warning', PropTypes.string,null,''])
};


FormGroup.defaultProps = {
  display:null
};

export default FormGroup
