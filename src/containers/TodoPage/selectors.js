import {createSelector} from 'reselect'
import _ from 'lodash';

const todos = (state) => state.get('todos');

const getVisibilityFilterTask = (state) => state.getIn(['todos', 'visibilityFilterTask']);

const getTask = (state,props) => {

    return _.find(state.getIn(['todos', 'tasks']).toJS(),{id : props.params.id})
} ;



const makeGetVisibleTask = () => createSelector(
    [getVisibilityFilterTask, todos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_COMPLETED':
                return _.filter(todos.get('tasks').toArray(), (task) => {
                    return task.get('isCompleted') === true
                });
            case 'SHOW_ACTIVE':
                return _.filter(todos.get('tasks').toArray(), (task) => {
                    return !task.get('isCompleted')
                });
            default:
                return todos.get('tasks').toArray()
        }
    }
);

const makeGetTaskById = () => createSelector(
    [getTask],
    (task) => task
);

export {
    makeGetVisibleTask,
    makeGetTaskById
}