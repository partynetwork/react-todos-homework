import {fromJS} from 'immutable';
import shortid from 'shortid';
import _ from 'lodash';

import {
    ADD_TASK,
    COMPLETE_TASK,
    SET_VISIBILITY_FILTER_TASK,
    UPDATE_TASK,
    REMOVE_TASK,
} from '../constants/todo';

const initialState = fromJS({
    visibilityFilterTask: 'SHOW_ALL',
    tasks: [
        fromJS({
            id: shortid.generate(),
            title: 'My First Task',
            isCompleted: false,
            description: 'Lorem',
            date: new Date()
        })
    ]
});

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK :
            let newTask = fromJS({
                ...action.task,
                id: shortid.generate(),
                isComplete: false
            });
            return state.updateIn(['tasks'], tasks => tasks.push(newTask));
            break;
        case UPDATE_TASK :
            const taskIndex = _.findIndex(state.get('tasks').toJS(), {id: action.task.get('id')});

            return state.updateIn(['tasks', taskIndex], task => {
                return task.merge({
                    title : action.task.get('title'),
                    description: action.task.get('description'),
                    date : action.task.get('date')
                });
            });
        case REMOVE_TASK :
            return state.set('tasks', state.get('tasks').filter(task=> task.get('id') !== action.task.get('id') ));
        case COMPLETE_TASK :
            return state.updateIn(['tasks', action.taskIndex], task => {
                return task.set('isCompleted', !task.get('isCompleted'));
            });
        case SET_VISIBILITY_FILTER_TASK :
            console.log('action', action);
            return state.set('visibilityFilterTask', action.filter);
        default:
            return state;
    }
}

export default todoReducer;