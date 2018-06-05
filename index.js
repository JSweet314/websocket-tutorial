const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('chat message',  msg => {
    io.emit('chat message', `${io.engine.clientsCount} users connected!`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
