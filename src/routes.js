module.exports = function(app, socketio) {
  app.use('/api/auth', require('./api/auth')(socketio));
  app.use('/api/users', require('./api/user'));
  app.use('/api/chats', require('./api/chat'));
};
