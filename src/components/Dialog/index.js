import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
const styledDialog = {
    overlay: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(32,41,52, 0.9)',
        transition:'all 0.2s ease'
    },
    content: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'relative',
        textAlign: 'left',
        border: 'none',
        background: 'transparent',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0px',
        transition:'all 0.2s ease',
    }
};
class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                contentLabel="Dialog"
                style={styledDialog}
            >
                {this.props.children}
            </Modal>
        );
    }
}

Dialog.defaultProps = {
    isOpen : true,
    childContent : '',
    childFooter : '',
    afterCloseFunc : ()=>{}
};

export default Dialog;


