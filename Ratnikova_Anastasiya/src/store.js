import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import {initReducer} from 'reducers';
import {loggerMiddleware} from 'middlewares/logger';
import {botMiddleware} from 'middlewares/bot';
import {fireChatMiddleware} from 'middlewares/fireChat';

export const history = createBrowserHistory();

export const store = createStore(initReducer(history), composeWithDevTools(
    applyMiddleware(
        createLogger(),
        // loggerMiddleware,
        botMiddleware,
        fireChatMiddleware,
        routerMiddleware(history)
    )
));