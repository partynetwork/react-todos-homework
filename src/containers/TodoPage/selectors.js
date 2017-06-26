import {createSelector} from 'reselect'
import _ from 'lodash';

const todos = (state) => state.get('todos');

const getVisibilityFilterTask = (state) => state.getIn(['todos','visibilityFilterTask']);


const makeGetVisibleTask = () => {
    return createSelector(
        [ getVisibilityFilterTask, todos ],
        (visibilityFilter, todos) => {

            console.log('visibilityFilter',visibilityFilter)
            console.log('todos',todos.get('tasks').toArray())
            switch (visibilityFilter) {
                case 'SHOW_COMPLETED':
                    return _.filter(todos.get('tasks').toArray(), (task)=> {
                        return task.get('isCompleted') === true
                    });
                default:
                    return todos.get('tasks').toArray()
            }
        }
    )
};

export {
    makeGetVisibleTask
}