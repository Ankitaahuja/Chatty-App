import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = event => {
      console.log('connected with server');
    };

    // _handleInput = ev => this.socket.send(this.state.messages);

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

  addMessage = content => {
    const message = {
      //making an message Object
      id: this.state.messages.length + 5, // as 3 ids are already formed, 5 is added to be safe
      username: this.state.currentUser.name,
      content: content
    };
    const messages = this.state.messages.concat(message);
    this.setState({ messages: messages });
    this.socket.send(JSON.stringify(message));
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
export default App;
