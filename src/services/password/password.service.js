const conf = require('../../config/auth');
const jwt = require('jwt-simple');

let expires = Math.floor(Date.now() / 1000) + 60 * 60; //1 hour
let token = null;
let payload = null;

function generateJwtResetClaims(user) {
  return {
    sub: user.id,
    exp: expires
  };
}

function generatePayloadRes(user) {
  return generateJwtResetClaims(user);
}

function newPassword(user) {
  payload = generatePayloadRes(user);
  token = jwt.encode(payload, conf.jwtSecret);
  return token;
}

module.exports = {
  newPassword
};
