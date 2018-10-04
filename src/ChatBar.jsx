import React, { Component } from 'react';

class ChatBar extends Component {
  handleKeyPress = event => {
    if (event.key == 'Enter' || event.keyCode == 13) {
      console.log('enter press here! ');
      const recieveMessage = {
        content: event.target.value,
        username: document.getElementById('chatbar-username').value
      };
      this.props.addMessage(recieveMessage);
      event.target.value = '';
    }
  };

  handleNameKeyPress = event => {
    if (event.key == 'Enter' || event.keyCode == 13) {
      console.log('enter press here! ');
      const recieveMessage = {
        username: event.target.value,
        content: document.getElementById('chatbar-message').value
      };
      this.props.addMessage(recieveMessage);
      document.getElementById('chatbar-message').value = '';
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
          onKeyPress={this.handleNameKeyPress}
        />
        <input
          className="chatbar-message"
          id="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
