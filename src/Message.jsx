import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span
          className="message-content"
          dangerouslySetInnerHTML={{ __html: this.props.message.content }}
        />
      </div>
    );
  }
}
export default Message;
