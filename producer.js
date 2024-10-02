const { stdin, stdout } = require('process');
const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer connected');

    rl.on('line', async function (line)  {
        const [ name, location ] = line.split(' ');
        await producer.send({
            topic: 'rider-updates',
    
            messages: [
                { partition: location.toLowerCase() === 'north' ? 0 : 1, key: 'location-update', value: JSON.stringify({ name: name, loc: location }) }
            ]
        });
    
    }).on('close', async () => {
        await producer.disconnect();
        console.log('Producer disconnected');
    });
}

init();