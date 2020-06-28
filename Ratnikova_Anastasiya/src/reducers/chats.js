import {CHATS_LOAD, CHATS_SEND} from 'actions/chats';
import update from 'react-addons-update';

const dataBackend = {
    '1': {
        name: 'Chat 1',
        messages: [
            {
                text: 'Текстовое сообщение 1',
                author: 'User'
            },
        ],
    },
    '2': {
        name: 'Chat 2',
        messages: [
            {
                text: 'Текстовое сообщение 2',
                author: 'User'
            },
        ],
    },
    '3': {
        name: 'Chat 3',
        messages: [
            {
                text: 'Текстовое сообщение 3',
                author: 'User'
            },
        ],
    },
};

const initialState = {
    entries: {}, //Chats
    loading: false,
};

export const chatsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CHATS_LOAD:
            return {
                ...state,
                entries: dataBackend,
            };
        case CHATS_SEND:
            //ES5
            // return Object.assign({}, {
            //         entries: {
            //             [action.payload.chatId]: {
            //                 messages: state.entries[action.payload.chatId].messages.concat([
            //                     {text: action.payload.text, author: action.payload.author}
            //                 ]),
            //             }
            //         }
            //     });

                //ES6
                // return {
                //     ...state,
                //     entries: {
                //         ...state.entries,
                //         [action.payload.chatId]: {
                //             ...state.entries[action.payload.chatId],
                //             messages: [
                //                 ...state.entries[action.payload.chatId].messages,
                //                 {text: action.payload.text, author: action.payload.author},
                //             ]
                //         }
                //     }
                // };

                //Современный вариант
                return update(state, {
                    entries: {
                        [action.payload.chatId]: {
                            messages: {$push: [{text: action.payload.text, author: action.payload.author}]},
                        }
                    }
                });
        default:
            return state;
    }
}