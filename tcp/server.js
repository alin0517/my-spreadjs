const net = require('net');
const server = net.createServer();

server.on('connection', clientSocket => {
    console.log('Have new client');

    clientSocket.on('data', data => {
        console.log('From client message:', data.toString())
    });

    clientSocket.write('Hi, I am server');

    process.stdin.on('data', data => {

        clientSocket.write(data.toString().trim())

    })
})

server.listen(3000, () => console.log('Server runing at http://127.0.0.1:3000'))