import React, { Component } from 'react';

class ChatBar extends Component {
  handleKeyPress = event => {
    if (event.key == 'Enter' || event.keyCode == 13) {
      console.log('enter press here! ');
      this.props.addMessage(event.target.value); // this is the content (Message Text)??
      event.target.value = '';
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
