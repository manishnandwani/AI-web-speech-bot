const express = require('express');
const app = express();

// require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
console.log('a user connected', APIAI_TOKEN);

const apiai = require('apiai')('fa2a42da4962456da19bb3326b13ef68')

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const server = app.listen(5000, () => {
    console.log("server started")
});

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('a user connected', APIAI_TOKEN);
});

io.on('connection', function (socket) {
    socket.on('chat message', (text) => {

        console.log("test")
        let apiaiReq = apiai.textRequest(text, {
            sessionId: '12c96328578c4812b4d70756d8d20c6e'
        })

        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            socket.emit('bot reply', aiText);
        })

        apiaiReq.on('error', (error) => {
            console.log(error);
        });

        apiaiReq.end();

    });
});




app.get('/', (req, res) => {
    res.sendFile('index.html');
})