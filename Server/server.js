const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const fetch = require('node-fetch');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

const broadcast = message => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  })
}

const sendUserCountMessage = () => {
  const userCountMessage = {
    type: 'userCountUpdate',
    userCount: wss.clients.size
  }
  broadcast(userCountMessage)
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size)

  sendUserCountMessage()

  ws.on('message', (data) => {
    let message = JSON.parse(data);
    message.id = uuidv1();
    //console.log(`${message.username} with ${message.id} is sending ${message.content}`);
    switch (message.type) {
      case "postMessage":
        message.type = "incomingMessage"
        giphy();

        return
      case "postNotification":
        message.type = "incomingNotification"
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(message));
        })
        return
    }

    function giphy() {
      var matches = message.content.match(/^\/giphy (.+)/)
      if (matches) {
        const qs = querystring.stringify({
          api_key: "PtVs4XyosTRTxYDKDAUck2vBQ7Aaqqj0",
          tag: matches[1]
        })
        fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
          .then(resp => resp.json())
          .then(json => {
            message.content = `<div>
                               <img src="${json.data.images.original.url}" alt="${matches[1]}"/>
                               <div>${matches[0]}</div>
                            </div>`
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(message));
            })
            console.log(`Sent: ${JSON.stringify(message)}`);
          })

      } else {
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(message));
        })
      }
    }
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => sendUserCountMessage());
});