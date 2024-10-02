const WebSocket = require('ws');

// Create a WebSocket server
const server = new WebSocket.Server({ port: 6007 });

server.on('connection', (socket) => {
    console.log('Client connected');

    // Handle messages received from client
    socket.on('message', (message) => {
        console.log(`Received from client: ${message}`);
        // Respond back to the client
        socket.send(Number(message) + 1);
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });

    // Handle errors
    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
});

console.log('WebSocket server is running on ws://localhost: 6007');
