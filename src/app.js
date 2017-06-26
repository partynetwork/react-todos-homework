import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, applyRouterMiddleware} from 'react-router';
import {useScroll} from 'react-router-scroll';
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';
import configure from './store'
const initialState = {};
const store = configure(initialState, browserHistory);


import createRoutes from './routes';

import App from 'containers/App';
import {selectLocationState} from 'containers/App/selectors';
import LanguageProvider from 'containers/LanguageProvider';
import {DefaultTheme} from './containers/ThemeProvider';
// Import i18n messages
import {translationMessages} from './i18n';
import 'bootstrap-reboot';
import 'bootstrap-grid';

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
});

const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

const render = (translatedMessages) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <LanguageProvider messages={translatedMessages}>
                    <DefaultTheme>
                        <Router
                            history={history}
                            routes={rootRoute}
                            // Scroll to top when going to a new page, imitating default browser
                            // behaviour
                            render={applyRouterMiddleware(useScroll())}
                        />
                    </DefaultTheme>
                </LanguageProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

if (module.hot) {
    module.hot.accept(App, () => {
        render(translationMessages);
    });
}

if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(System.import('intl'));
    }))
        .then(() => Promise.all([
            System.import('intl/locale-data/jsonp/en.js'),
        ]))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    render(translationMessages);
}