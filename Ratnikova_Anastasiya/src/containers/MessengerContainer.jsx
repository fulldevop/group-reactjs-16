import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {Messenger} from 'components/Messenger';
import {chatsLoad, chatsSend, chatsAdd} from 'actions/chats';

class MessengerContainer extends Component {
    componentDidMount(){
        const {chatsLoadAction} = this.props;

        console.log(this.props);

        if(!this.props.chats.length){
            chatsLoadAction(); //Получение чатов
        }
    };

    handleMessageSend = (message) => {
        const {chatId, chatsSendAction} = this.props;

        chatsSendAction({
            ...message,
            chatId,
        });
    };

    handleChatsAdd = () => {
        const {chatsAddAction, newChatId, redirect} = this.props;
        const chatName = prompt('Введите имя чата');

        chatsAddAction(newChatId, chatName);
        redirect(newChatId);
    };

    render() {
        const {chats, messages, chatId} = this.props;

        return (
            <Messenger chatId={chatId} addChat={this.handleChatsAdd} chats={chats} messages={messages} sendMessage={this.handleMessageSend} />
        );
    }
}

/**
 * Для того, чтобы получить данные из store
 * @param {*} state 
 * @param {*} ownProps 
 */
function mapStateToProps(state, ownProps){
    const chats = state.chats.entries;
    const {match} = ownProps;

    let messages = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
    }

    let chatsArrayForShow = [];
    let blinkingChats = [];

    for(let key in chats){
        if(chats.hasOwnProperty(key)){
            chatsArrayForShow.push({name: chats[key].name, link: `/chats/${key}`});
        }

        if (chats[key]['blinking']) {
            blinkingChats.push(key);
        }
    }

    const lastId = Object.keys(chats).length ? Object.keys(chats).length : 1;
    const chatId = match ? match.params.id: null;

    return {
        chats: chatsArrayForShow,
        messages,
        chatId: chatId,
        newChatId: lastId + 1,
        blinkingChats: blinkingChats
    }
}

/**
 * Для работы с actions
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoad()),
        chatsSendAction: (message) => dispatch(chatsSend(message)),
        chatsAddAction: (newChatId, chatName) => dispatch(chatsAdd(newChatId, chatName)),
        // chatsFireAction: (blinkingChat) => dispatch(chatsFire(blinkingChat)),
        redirect: (id) => dispatch(push(`/chats/${id}`))
    };
}

export const MessengerRedux = connect(mapStateToProps, mapDispatchToProps)(MessengerContainer);