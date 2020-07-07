import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //localStorage

import {initReducer} from 'reducers';
import {loggerMiddleware} from 'middlewares/logger';
import {botMiddleware} from 'middlewares/bot';
import {fireChatMiddleware} from 'middlewares/fireChat';

export const history = createBrowserHistory();

/*export const store = createStore(initReducer(history), composeWithDevTools(
    applyMiddleware(
        createLogger(),
        // loggerMiddleware,
        botMiddleware,
        // fireChatMiddleware,
        routerMiddleware(history)
    )
));*/

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chats'],
};

export function initStore(){
    const initialStore = {};

    const store = createStore(
        persistReducer(persistConfig, initReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                createLogger(),
                // loggerMiddteware,
                botMiddleware,
                /*apiMiddleware,
                thunk,*/
            )));

    const persistor = persistStore(store);
    return {store, persistor};
}