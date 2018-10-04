import React, { Component } from 'react';

class Message extends Component {
  render() {
    // var { message } = this.props;
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
