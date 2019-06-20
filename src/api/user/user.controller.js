const User = require('./user.model').User;
const UserSchema = require('./user.model').UserSchema;
const passwordService = require('../../services/password/password.service');
const resourceService = require('../../services/resource/resource.service');

function index(req, res) {
  resourceService
    .get(User, req.query)
    .then(users => res.status(200).json(users))
    .catch(error => handleError(res, error));
}

function show(req, res) {
  resourceService
    .find(User, req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function createLocalAccount(req, res) {
  const data = handleCreateLocalAccountRequest(req);

  resourceService
    .add(User, data)
    .then(user => {
      passwordService.newPassword(user);
      return res.status(201).json(user);
    })
    .catch(error => handleError(res, error));
}

function update(req, res) {
  req = handleUpdateRequest(req);

  resourceService
    .edit(User, req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function destroy(req, res) {
  resourceService
    .remove(User, req.params.id)
    .then(data => res.status(204).send('No Content'))
    .catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function handleError(res, err, code = 400) {
  return res.status(code).send(err);
}

function handleUpdateRequest(req) {
  if (req.body._id) {
    delete req.body._id;
  }

  return req;
}

function search(req, res) {
  resourceService
    .search(User, req.query)
    .then(users => res.status(200).json(users))
    .catch(error => handleError(res, error));
}

function handleCreateLocalAccountRequest(req) {
  const request = req.body;

  return {
    name: request.name,
    email: request.email,
    username: request.username || undefined,
    password: request.password
  };
}

module.exports = {
  index,
  show,
  createLocalAccount,
  update,
  destroy,
  search
};
