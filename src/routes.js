const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {

    return [
        {
            path: '/',
            name: 'todoLists',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('./containers/TodoPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/view/:id',
            name: 'todoView',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import('./containers/TodoPage/View'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                System.import('./containers/ErrorPage/404')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}
