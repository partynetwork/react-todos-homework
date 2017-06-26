import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// language=SCSS
const InputText = styled.input`
  & {
    width: 100%;
    height: 40px;
    padding: 12px 12px;
    background: #dbdce2  none;
    color: #2e2f43;
    border: 2px solid ${props => props.display ? props.theme[props.display + 'Color'] : 'transparent'};
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    border-radius: 3px;
    font-size: 1rem;
    &:focus, &:active {
      outline: 0;
      border-color: #9499bb;
    }
    
  }
`;

class TextField extends Component {

    render() {

        const {
            type,
            inputRef,
            className,
            ...props
        } = this.props;

        return (
            <InputText type={type}
                       ref={inputRef}
                       className={classNames(className)}
                       {...props} />
        );
    }
}

TextField.defaultProps = {
    type: 'text',
    placeholder: 'Enter Text',
    size: 'normal',
    inputRef: () => {
    }
};

TextField.propTypes = {
    display: PropTypes.oneOf(['', 'primary', 'success', 'error', 'warning']),
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    inputRef: PropTypes.func
};

export default TextField
