const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('newMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('newNotification', (notification) => {
        io.emit('notification', notification);
    });

    socket.on('typing', (userId) => {
    io.emit('typing', userId);
    });

    socket.on('stopTyping', (userId) => {
    io.emit('stopTyping', userId);
    });

  socket.on('updateLastSeen', (userId, timestamp) => {
    User.updateOne({ id: userId }, { last_seen: timestamp }, (err) => {
        if (err) console.error(err);
    });
});
});

      
