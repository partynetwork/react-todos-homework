/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist-immutable';
import createReducer from './reducers';



export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        autoRehydrate()
    ];

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        compose(...enhancers),
    );

    // Make reducers hot reloadable, see http://mxs.is/googmo
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            import('./reducers').then((reducerModule) => {
                const createReducers = reducerModule.default;
                const nextReducers = createReducers(store.asyncReducers);

                store.replaceReducer(nextReducers);
            });
        });
    }

    return store;
}
