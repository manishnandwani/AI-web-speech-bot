'user strict';
const socket = io();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('button').addEventListener('click', () => {
    recognition.start();
    console.log("speech started")
})

recognition.addEventListener('result', () => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    cosnole.log('Confidence:' + e.results[0][0].confidence);

    socket.emit('chat message', text);

})

function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterence = new SpeechSynthesisUtterance();
    utterence.text = text;
    synth.speak(utterence);
}