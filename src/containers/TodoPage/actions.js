/*
 * CheatApp Actions
 *
 */

import {
    ADD_TASK,
    UPDATE_TASK,
    COMPLETE_TASK,
    SET_VISIBILITY_FILTER_TASK,
} from 'constants/todo';

/**
 * Add Task to todo
 *
 * @param  {object} task object
 *
 * @return {object}    An action object with a type of ADD_TASK
 */
export function addTodo(task) {
    return {
        type: ADD_TASK,
        task
    };
}
export function updateTodo(task) {
    return {
        type: UPDATE_TASK,
        task
    };
}
/**
 * Set complete task
 *
 * @param  {int} taskIndex object
 *
 * @return {object}    An action object with a type of COMPLETE_TASK
 */
export function completeTodo(taskIndex) {
    return {
        type: COMPLETE_TASK,
        taskIndex
    };
}

export function setVisibilityFilterTask(filter) {
    return {
        type: SET_VISIBILITY_FILTER_TASK,
        filter
    };
}