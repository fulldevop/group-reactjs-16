import {CHATS_SEND, chatsFire} from 'actions/chats';

export function fireChatMiddleware(store) {
    return function dispatchWrap(next) {
        return function dispatchLog(action) {
            if (action.type === CHATS_SEND) {
                const {chatId, author} = action.payload;
                const currentChat = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

                if (author === 'Bot' && currentChat !== chatId) {
                    store.dispatch(chatsFire({blinkingChatId: chatId}));
                }
            }

            return next(action);
        }
    }
}