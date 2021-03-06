const VoiceStreamingClient = require('./index');
const eventNames = require('../eventNames');

const serverUrl = 'http://af7541ba.ngrok.io/';
const recordDuration = 10000;

const client = new VoiceStreamingClient(serverUrl);
client.on(eventNames.audioLiveStream.ready, () => {
    console.log('READY EVENT');
    client.record();
    setTimeout(
        async () => {
            await endStream(client.recordProcess);
        },
        recordDuration
    );
});
client.startStream();

async function endStream(process) {
    return new Promise((resolve) => {
        process.kill('SIGTERM');
        process.once('exit', () => {
            resolve();
        });
    });
}
