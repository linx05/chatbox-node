const mongoose = require('mongoose');
const aqp = require('api-query-params');
const Message = require('./message.model').Message;
const { UserStatus, USER_STATUSES } = require('./status.model');

function getConversation(req, res) {
  const query = aqp(req.query);

  const conversationId = req.params.id;

  if (req.query.user && !mongoose.Types.ObjectId.isValid(req.query.user)) {
    return handleError(res, 'No valid user', 422);
  }

  const filter = conversationId
    ? {
        _id: conversationId
      }
    : {
        users: { $all: [req.user.id, mongoose.Types.ObjectId(req.query.user)] }
      };
  // Default query parameters
  query.sort = query.sort || '-date';
  query.limit = query.limit || 100;

  Message.find(filter)
    .skip(query.skip)
    .limit(query.limit)
    .sort(query.sort)
    .exec((err, data) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(data);
    });
}

function handleCreateMessage(req) {
  const request = req.body;

  return {
    users: [req.user.id, request.to],
    from: req.user.id,
    to: request.to,
    data: request.data,
    date: new Date(),
    read: false
  };
}

function create(req, res) {
  const request = handleCreateMessage(req);

  Message.create(request)
    .then(() => {
      return res.status(201).send();
    })
    .catch(err => {
      return handleError(res, err);
    });
}

function show(req, res) {
  const query = aqp(req.query);

  query.filter.$or = [
    { from: req.user.id, to: req.params.userId },
    { from: req.params.userId, to: req.user.id }
  ];

  Message.find(query.filter)
    .skip(query.skip)
    .limit(query.limit)
    .sort(query.sort)
    .exec((err, data) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(data);
    });
}

function connect(req, res) {
  UserStatus.findOneAndUpdate(
    { user: req.user.id },
    {
      user: req.user.id,
      status: USER_STATUSES.ONLINE,
      last_connect: new Date()
    },
    { upsert: true }
  )
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      if (err) {
        return handleError(res, err);
      }
    });
}

function getConnected(req, res) {
  const lastFiveMinutesConnected = {
    last_connect: {
      $gte: new Date(Date.now() - 5 * (1000 * 60))
    }
  };

  findUsers({ status: USER_STATUSES.ONLINE, ...lastFiveMinutesConnected })
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return handleError(res, err);
    });
}

function getChatUsers(req, res) {
  findUsers()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return handleError(res, err);
    });
}

function findUsers(query) {
  return new Promise((resolve, reject) => {
    UserStatus.find(query)
      .populate({
        path: 'user',
        select: 'active _id name username'
      })
      .cache(30)
      .select('_id user status last_connect')
      .exec((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
  });
}

function handleError(res, err, code = 500) {
  return res.status(code).send(err);
}

module.exports = {
  getConversation,
  connect,
  create,
  show,
  getConnected,
  getChatUsers
};
