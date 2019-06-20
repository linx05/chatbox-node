const chatService = require('../../services/chat/chat.service');
const chatStateService = require('../../services/chat/chat-state.service');

function onConnect(socket) {
  emitToAll(socket, 'chat:user-connect', { userId: socket.decoded_token.id });

  chatStateService.addUser(socket.decoded_token.id, socket.id);

  socket.emit('chat:online-list', chatStateService.getOnlineUsers());
}

function onMessage(socket, data) {
  const to = chatStateService.getUser(data.to);
  const message = {
    from: socket.decoded_token.id,
    to: data.to,
    data: data.data,
    date: new Date(),
    read: false
  };

  if (to) {
    to.sockets.forEach(socketId => {
      socket.to(socketId).emit('chat:message', message);
    });
  }

  // The server received the message doesn't mean
  // that the customer also received the message.
  socket.emit('chat:message-sent', message);

  chatService.saveMessage(message);
}

function onMessageRead(socket, data) {
  chatService.updateChat(data.from, socket.decoded_token.id);
}

function onDisconnect(socket) {
  chatStateService.removeUser(socket.decoded_token.id, socket.id);

  emitToAll(socket, 'chat:user-disconnect', {
    userId: socket.decoded_token.id
  });
}

function emitToAll(socket, event, data) {
  const users = chatStateService.getUsers();
  const sockets = users.reduce((acc, user) => acc.concat(user.sockets), []);

  sockets.forEach(socketId => socket.to(socketId).emit(event, data));
}

module.exports = {
  register(socket) {
    socket.on('chat:connect', function(data) {
      onConnect(this, data);
    });

    socket.on('chat:message', function(data) {
      onMessage(this, data);
    });

    socket.on('chat:message-read', function(data) {
      onMessageRead(this, data);
    });

    socket.on('disconnect', function(data) {
      onDisconnect(this, data);
    });
  }
};
