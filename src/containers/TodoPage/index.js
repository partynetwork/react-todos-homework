import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import _ from 'lodash';
import is from 'is_js';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styled from 'styled-components';

// Import actions
import {addTodo, updateTodo, completeTodo, setVisibilityFilterTask} from './actions';
import * as globalAction from 'actions/global';
// Import constant
import {COMPLETE_TASK} from 'constants/todo';
// Import selectors
import {todos, makeGetVisibleTask} from './selectors';
// Import components
import IconButton from 'components/Button/IconButton';
import TodoItem from 'components/TodoItem';
import Button from 'components/Button';
import Form from './Form';
import Dialog from 'components/Dialog';
// language=SCSS prefix=&{ suffix=}
const Main = styled.main`
    max-width: 600px !important;
    background-color: white;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin-top: 5em;
`;// language=SCSS prefix=&{ suffix=}
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E0E0E0;
`;
// language=SCSS prefix=&{ suffix=}
const Title = styled.h1`
    text-align: center;
    font-weight: 600;
    margin: 0;
`;

// language=SCSS prefix=&{ suffix=}
const FilterTools = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d3a4ff;
    border-bottom: 1px solid #E0E0E0;
`;
// language=SCSS prefix=&{ suffix=}
const TodoWrapper = styled.ul`
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      list-style: none
    }
`;

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: 'all',
            showDialog: false,
            taskSelected: null
        };
    }

    handleClickTodoItemCheckbox(task) {
        const {todos, completeTodo} = this.props;
        const idx = todos.get('tasks').indexOf(task);
        completeTodo(idx);
    }


    handleClickTodoItemContent() {

    }

    handleClickAddTodoItem() {
        this.setState({
            showDialog:true
        })
    }
    handleClickTodoItemEdit(task) {
        this.setState({
            showDialog:true,
            taskSelected: task
        })
    }

    handleClickFilter(filter) {
        this.props.setVisibilityFilterTask(filter)
    }

    handleSubmitTodo(data) {
        const {addTodo,updateTodo} = this.props;
        if(is.truthy(data.get('id'))){
            updateTodo(data)
        }else {
            addTodo({
                title: data.get('title'),
                description: data.get('description'),
                date : is.truthy(data.get('date')) ? data.get('date'):null
            })
        }
        this.handleClickCloseDialog();
    }
    handleClickCloseDialog() {
        this.setState({
            taskSelected:{},
            showDialog:false
        })
    }

    renderTodoItems() {
        const {tasks} = this.props;
        return _.map(tasks, (task, i) => {

            return <TodoItem
                key={i}
                task={task}
                isChecked={task.get('isCompleted')}
                onClickCheckbox={this.handleClickTodoItemCheckbox.bind(this, task)}
                onClickEdit={this.handleClickTodoItemEdit.bind(this, task)}
                onClickContent={this.handleClickTodoItemContent.bind(this, task)}
            />
        });
    }

    render() {
        const {todos, tasks} = this.props;
        return (
            <Main className="container">
                <Dialog isOpen={this.state.showDialog}>
                    <Form
                        initialValues={this.state.taskSelected}
                        onSubmit={this.handleSubmitTodo.bind(this)}
                        handleClickCloseDialog={this.handleClickCloseDialog.bind(this)}
                    />
                </Dialog>
                <section className="row">
                    <Header className="col-xs-12 col-md-12">
                        <Title>
                            <FormattedMessage {...messages.title} />
                        </Title>
                        <div>
                            <IconButton onClick={this.handleClickAddTodoItem.bind(this)}>
                                <i className="material-icons">add</i>
                            </IconButton>
                        </div>
                    </Header>
                    <FilterTools className="col-xs-12 col-md-12">
                        <span>{tasks.length} Item(s)</span>
                        <div>
                            <Button
                                outline={todos.get('visibilityFilterTask') !== 'SHOW_ALL'}
                                display={'primary'}
                                size={'sm'}
                                onClick={this.handleClickFilter.bind(this, 'SHOW_ALL')}>
                                All
                            </Button>
                            <Button
                                outline={todos.get('visibilityFilterTask') !== 'SHOW_COMPLETED'}
                                display={'primary'}
                                size={'sm'}
                                onClick={this.handleClickFilter.bind(this, 'SHOW_COMPLETED')}>
                                Completed
                            </Button>
                        </div>
                    </FilterTools>
                </section>
                <section className="row">
                    <TodoWrapper>
                        {this.renderTodoItems()}
                    </TodoWrapper>
                </section>
            </Main>
        );
    }
}


const makeMapStateToProps = () => {
    const getVisibleTodoTask = makeGetVisibleTask();
    return (state, props) => {
        return {
            todos: state.get('todos'),
            tasks: getVisibleTodoTask(state, props)
        }
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
        updateTodo: bindActionCreators(updateTodo, dispatch),
        completeTodo: bindActionCreators(completeTodo, dispatch),
        setVisibilityFilterTask: bindActionCreators(setVisibilityFilterTask, dispatch),
        globalAction: bindActionCreators(globalAction, dispatch)
    }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoPage);