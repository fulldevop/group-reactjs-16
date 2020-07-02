import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import {rootReducer} from 'reducers';
import {loggerMiddleware} from 'middlewares/logger';
import {botMiddleware} from 'middlewares/bot';

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(
        createLogger(),
        loggerMiddleware,
        botMiddleware
    )
));