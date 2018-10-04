import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      id: [],
      currentUser: { username: 'Ankita' },
      messages: [] //messgaes coming from the server will be stored here
    };
  }

  addMessage = content => {
    const message = {
      username: content.username,
      content: content.content
    };

    this.socket.send(JSON.stringify(message));
  };
  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      console.log('connected with server');
    };

    this.socket.onmessage = event => {
      let message = JSON.parse(event.data);
      console.log(message);
      const messages = this.state.messages.concat(message);
      this.setState({ messages: messages });
    };

    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
export default App;
