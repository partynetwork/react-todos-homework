import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

// language=SCSS prefix=dummy{ suffix=}
const AppContainer = styled.main`
    position: absolute;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgb(236, 237, 237);
`;
class App extends Component {

    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        const {global} = this.props;
        return (
            <AppContainer>
                {React.Children.toArray(this.props.children)}
            </AppContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        global: state.get('global')
    }
};

export default connect(mapStateToProps)(App);
