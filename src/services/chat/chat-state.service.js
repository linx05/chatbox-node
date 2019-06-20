const users = new Map();

const status = Object.freeze({
  online: 'online',
  busy: 'busy',
  offline: 'offline'
});

function addUser(userId, socketId) {
  if (users.has(userId)) {
    users.get(userId).sockets.push(socketId);
  } else {
    users.set(userId, {
      user: userId,
      status: status.online,
      sockets: [socketId]
    });
  }

  return users.get(userId);
}

function changeStatus(userId, newStatus) {
  const user = users.get(userId);

  if (!user) return false;

  user.status = newStatus;

  return true;
}

function getUser(userId) {
  return users.get(userId);
}

function getUsers() {
  return [...users.values()];
}

function getOnlineUsers() {
  return getUsers().filter(user => user.status === status.online);
}

function removeUser(userId, socketId) {
  const user = users.get(userId);

  if (!user) return false;

  if (user.sockets.length > 1) {
    user.sockets = user.sockets.filter(socket => socket !== socketId);
    return true;
  }

  return users.delete(userId);
}

module.exports = {
  addUser,
  changeStatus,
  getOnlineUsers,
  getUser,
  getUsers,
  removeUser
};
