const socket = io();

// variables for DOM elems
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const output = document.getElementById('output');
const typing = document.getElementById('typing');
const button = document.getElementById('button');


// send typing message
message.addEventListener('keypress', () =>{
    socket.emit('userTyping', handle.value)
})


// button click send messages to server, then gets sent to clients 
button.addEventListener('click', () =>{
    socket.emit('userMessage', {
        handle: handle.value,
        message: message.value
    })
    document.getElementById('message').value="";
})



// listen for events from the server
socket.on('userMessage', (data) => {
    typing.innerHTML ="";
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
})
socket.on('userTyping', (data) => {
    typing.innerHTML = '<p> <strong>' + data + ' is typing... </strong></p>'
})
