import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getBGColor = (props) => {
    let color;
    const {display} = props;
    switch (display) {
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
            color = props.theme[display];
            break;
    }
    return color;
};

const getTxtColor = (props) => {
    let color;
    const {display} = props;
    if (!['','warning','success'].includes(display)) {
        color = '#E0E1E5'
    } else {
        color = '#23102e'
    }
    return color;
};


const getPaddingSize = (props)=> {
    const {size} = props;
    if(size === 'sm') {
        return '3px 14px';
    }else {
        return '6px 28px'
    }
};

const getFontSize = (props)=> {
    const {size} = props;
    if(size === 'sm') {
        return '0.8rem';
    }else {
        return '1rem'
    }
};

// language=SCSS
const StyledButton = styled.button`  
  &{
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation; 
    font-weight: 400;    
    white-space: nowrap;
    padding: ${(props) => getPaddingSize(props)};
    font-size: ${(props) => getFontSize(props)};
    border:2px solid transparent;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    color : ${(props) => getTxtColor(props)};
    background-color :${(props) => getBGColor(props)};
    border-radius: 3px;
    user-select: none;
    margin: 4px;
    transition: box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1);
    &:first-child{
    margin-left: 0;
    }
    &:last-child{
    margin-right: 0;
    }
    &:active,&:focus{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
    outline: none;
    }
    
    width: ${props=> props.block ? '100%':'auto'};
  }
`;

// language=SCSS
const StyledButtonOutLine = StyledButton.extend`
    &{
      background-color: transparent;
      border-color : ${(props) => getBGColor(props)};
      color: ${(props) => getBGColor(props)};
    }
`;

class Button extends Component {
    render() {
        const {className, outline, ...props} = this.props;
        const fullClassName = classNames(className);

        if (outline !== true) {
            return (
                <StyledButton
                    {...props}
                    type={props.type || 'button'}
                    className={fullClassName}
                />
            );
        } else {
            return (
                <StyledButtonOutLine
                    {...props}
                    type={props.type || 'button'}
                    className={className}
                />
            );
        }
    }
}

Button.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    size: PropTypes.string,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    href: PropTypes.string,
    /**
     * Defines HTML button type attribute
     * @defaultValue 'button'
     */
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    display: PropTypes.any
};

Button.defaultProps = {
    active: false,
    block: false,
    disabled: false,
    isLoading: false,
    outline: false,
    size: '',
    display: ''
};

export default Button
