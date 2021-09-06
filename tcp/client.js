const net = require('net');
const client = net.createConnection({
    host:'127.0.0.1',
    port:3000
});

client.on('connect', ()=>{
    console.log('connetct server');

    client.write('word. I am client');

    process.stdin.on('data', data=> {
        console.log(data.toString());

        client.write(data.toString().trim());
    })
})