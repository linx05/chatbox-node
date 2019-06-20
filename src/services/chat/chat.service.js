let Message = require('../../api/chat/message.model').Message;

function saveMessage(message) {
  return Message.create(message);
}

function updateChat(from, to) {
  Message.update(
    { $or: [{ from, to }] },
    { read: true },
    { multi: true },
    noop
  );
}

function noop() {}

module.exports = {
  saveMessage,
  updateChat
};
