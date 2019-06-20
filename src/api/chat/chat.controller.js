const aqp = require('api-query-params');
const Message = require('./message.model').Message;

function index(req, res) {
  const query = aqp(req.query);

  // Check if this really works when
  // the query params have a from/to key
  query.filter.$or = [{ from: req.user.id }, { to: req.user.id }];

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

function handleError(res, err, code = 500) {
  return res.status(code).send(err);
}

module.exports = { index, show };
