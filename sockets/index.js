const path = require('path')
module.exports = (io) => {
    let MySocket = io.of('/socket')
    MySocket.on('connection', (socket) => {
        let socketId = socket.id

        socket.on('disconnect', () => {
            console.log("Ông " + socketId + " disconnect")
        })
    })
}