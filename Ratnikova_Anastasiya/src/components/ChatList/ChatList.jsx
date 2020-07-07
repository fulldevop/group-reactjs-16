import React, {Component, Fragment} from 'react';

import {List, ListItem, ListItemText, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';


import './ChatList.scss';

export class ChatList extends Component {
    render() {
        const {chats, addChat, chatId, blinkingChats} = this.props;

        // console.log(this.props);

        let chatsComponents = [];
        for(let chatKey in chats) {
            chatsComponents.push(
                <ListItem key={chatKey} className={`chat-list__item`}>
                    <Link to={`/chats/${chatKey}`} className="chat-list__link">
                        <ListItemText primary={chats[chatKey].name} />
                    </Link>
                </ListItem>
            );
        }

        /**
         * @param {string} link Link current chat
         * @returns {number} Return chat id
         */
        function chatLinkId(link) {
            let array = link.split('/');
            return +array[array.length - 1];
        }

        /**
         * @param {string} link Link current chat
         * @returns {number} Return chat id
         */
        function isBlinking(link) {
            const currentChat = chatLinkId(link);

            for (let key in blinkingChats) {
                if (+key === currentChat) {
                    return '--blinking';
                }
            }
        }
        //TODO допилить мигалку
        return (
            <List className="chat-list">
                {chats.map((chat, index) =>
                    <ListItem key={index} className={`chat-list__item`}>
                        <Link to={chat.link} className="chat-list__link">
                            <ListItemText primary={chat.name} />
                        </Link>
                    </ListItem>
                )}
                <Button onClick={addChat} variant="contained" color="secondary">
                    <ListItemText primary="Add chat" />
                </Button>
            </List>
        );
    }
}