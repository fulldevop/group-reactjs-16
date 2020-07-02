import {CHATS_SEND, chatsSend} from 'actions/chats';

export function botMiddleware(store) {
    return function dispatchWrap(next) {
        return function dispatchLog(action) {
            if (action.type === CHATS_SEND) {
                const messagesList = document.getElementById('message_list');
                const {chatId, author} = action.payload;

                if (author !== 'Bot') {
                    setTimeout(() => {
                        if (author !== 'Bot') {
                            store.dispatch(chatsSend({chatId, text: `${author}, Это автоответ бота!`, author: 'Bot'}));
                        }
                    }, 3000);
                }

                messagesList.scrollTop = messagesList.scrollHeight;
                /*const {chatId, author} = action.payload;

                if (author !== 'Bot') {
                    store.dispatch(chatsSend({chatId, text: `${author}, Это автоответ бота!`, author: 'Bot'}));
                }*/
            }

            return next(action);
        }
    }
}