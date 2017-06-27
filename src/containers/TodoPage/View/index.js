import React, {Component} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import moment from 'moment';
import styled from 'styled-components';
import {makeGetTaskById} from '../selectors';
import Button from "../../../components/Button/index";
//language=SCSS prefix=&{ suffix=}
const Main = styled.main`
    max-width: 600px !important;
    background-color: white;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin-top: 5em;
    padding: 2em 15px;
`;
class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {task} = this.props;
        return (
            <Main className="container">
                <section className="col-xs-12 col-md-12">
                    <header>
                        <h2>{task.title}</h2>
                    </header>
                    <div>
                        <h4>Description :</h4>
                        <p>
                            {task.description}
                        </p>

                        <h4>Date :</h4>
                        <span>{moment(task.date).format('lll')}</span>
                    </div>
                    <br/>
                    <div>
                        <Button onClick={()=>{browserHistory.push('/')}}>
                            Back
                        </Button>
                    </div>
                </section>
            </Main>
        );
    }
}

View.defaultProps = {};


function makeMapStateToProps(state, props) {
    const taskId = props.params.id;
    const getTaskById = makeGetTaskById();
    return function mapStateToProps(state) {
        return {
            task: getTaskById(state, props)
        }
    }
}

export default connect(makeMapStateToProps)(View);