import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => {
          return <Message message={message} key={message.id} />; //sending message objects and key(id) to Message.jsx
        })}
        <div className="message system">
          <span className="notification-content">
            Anonymous1 changed their name to nomnom.
          </span>
        </div>
      </main>
    );
  }
}
export default MessageList;
