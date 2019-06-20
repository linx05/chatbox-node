require('dotenv').config({ silent: true });
const _ = require('lodash');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const ENV = process.env.APP_ENV || 'development';
// All configurations will extend these options
// ============================================
const all = {
  api: process.env.API_URL || 'http://localhost:9000',

  site:
    process.env.SITE ||
    (process.env.HTTPS_MODE
      ? 'https://localhost:3000'
      : 'http://localhost:3000'),

  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: process.env.SEED_DB ? eval(process.env.SEED_DB) : false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET || 'myAppSecretForNode'
  },
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      useNewUrlParser: true
    }
  },

  https: process.env.HTTPS_MODE || false
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + ENV + '.js') || {});
