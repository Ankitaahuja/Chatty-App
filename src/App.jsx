import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      userCount: 0,
      id: [],
      currentUser: { username: 'Ankita' },
      messages: [] //messgaes coming from the server will be stored here
    };
  }

  addMessage = content => {
    const message = {
      type: 'postMessage',
      username: this.state.currentUser.username,
      content: content
    };
    this.socket.send(JSON.stringify(message));
  };

  addNotification = username => {
    const notification = {
      type: 'postNotification',
      content: `${
        this.state.currentUser.username
      } has changed their name to ${username}`
    };
    this.socket.send(JSON.stringify(notification));
    this.setState({ currentUser: { username } });
  };
  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      console.log('connected with server');
    };

    this.socket.onmessage = event => {
      let message = JSON.parse(event.data);
      switch (message.type) {
        case 'incomingMessage':
          this.setState({ messages: [...this.state.messages, message] });
          // handle incoming message
          break;
        case 'incomingNotification':
          this.setState({ messages: [...this.state.messages, message] });
          break;
        case 'userCountUpdate':
          this.setState({ userCount: message.userCount });
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + message.type);
      }
    };
  };

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.username}
          addMessage={this.addMessage}
          addNotification={this.addNotification}
        />
      </div>
    );
  }
}
export default App;
