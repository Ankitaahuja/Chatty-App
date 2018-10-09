import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => {
          switch (message.type) {
            case 'incomingMessage':
              return <Message message={message} key={message.id} />;
            case 'incomingNotification':
              return (
                <Notification key={message.id} content={message.content} />
              );
          }
        })}
      </main>
    );
  }
}
export default MessageList;
