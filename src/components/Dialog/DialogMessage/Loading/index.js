import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components';

const CssLoad = styled.div`
    width: 150px;
    height: 100px;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
    background:white
   
`;
const spinWheelKeyFrames = keyframes`
    
        100%{ transform: rotate(360deg); transform: rotate(360deg); }
    
`;
const CssSpeeding = styled.div`
    
    width: 49px;
    height: 49px;
    margin: 0 auto;
    border: 3px solid ${ (props) => props.color};
    border-radius: 50%;
    border-left-color: transparent;
    border-right-color: transparent;
    animation: ${spinWheelKeyFrames} 575ms infinite linear;
`;

class Loading extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <CssLoad>
                <CssSpeeding color={this.props.color} />
            </CssLoad>
        );
    }
}

Loading.defaultProps = {
    color: '#6F95D6'
};

export default Loading;