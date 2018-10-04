import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUser,
      messsage: ''
    };
  }

  handleKeyPress = event => {
    if (event.key == 'Enter' || event.keyCode == 13) {
      this.props.addMessage(this.state.message);
      this.setState({ message: '' });
    }
  };

  handleNameKeyPress = event => {
    if (event.key == 'Enter' || event.keyCode == 13) {
      this.props.addNotification(this.state.username);
    }
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          id="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyPress={this.handleNameKeyPress}
        />
        <input
          className="chatbar-message"
          id="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
