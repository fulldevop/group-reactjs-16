import {CHATS_LOAD, CHATS_SEND, CHATS_ADD, CHATS_FIRE} from 'actions/chats';
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
		blinking: false
	},
	'2': {
		name: 'Chat 2',
		messages: [
			{
				text: 'Текстовое сообщение 2',
				author: 'User'
			},
		],
		blinking: false
	},
	'3': {
		name: 'Chat 3',
		messages: [
			{
				text: 'Текстовое сообщение 3',
				author: 'User'
			},
		],
		blinking: false
	},
};

const initialState = {
	entries: {}, //Chats
	loading: false,
};

export const chatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHATS_LOAD:
			return {
				...state,
				entries: dataBackend,
			};
		case CHATS_SEND:
			return update(state, {
				entries: {
					[action.payload.chatId]: {
						messages: {$push: [{text: action.payload.text, author: action.payload.author}]},
					}
				}
			});
		case CHATS_ADD:
			const {name, chatId} = action.payload;
			return update(state, {
				entries: {
					$merge: {
						[chatId]: {
							name: name,
							messages: []
						}
					}
				}
			});
		case CHATS_FIRE:
			return update(state, {
				entries: {
					[action.payload.blinkingChatId]: {
						blinking: {$set: true}
					}
				}
			});
		default:
			return state;
	}
};