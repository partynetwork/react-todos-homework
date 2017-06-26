
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// Import reducers
import todoReducer from './todos';
import globalReducer from './global';
import {reducer as reduxFormReducer} from 'redux-form/immutable'
import languageProviderReducer from '../containers/LanguageProvider/reducer';

// Initial routing state
const routeInitialState = fromJS({
    locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.merge({
                locationBeforeTransitions: action.payload,
            });
        default:
            return state;
    }
}

export default function createReducer(asyncReducers) {
    return combineReducers({
        route: routeReducer,
        language: languageProviderReducer,
        todos: todoReducer,
        global: globalReducer,
        form: reduxFormReducer,
        ...asyncReducers,
    });
}
