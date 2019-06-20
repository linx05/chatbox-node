exports = module.exports = () => {
  console.log('running migrations');
  let User = require('../api/user/user.model').User;
  let userSeed = require('../api/user/user.seed.json');
  let Freight = require('../api/freight/freight.model').Freight;
  let freightSeed = require('../api/freight/freight.seed.json');

  User.find({}).remove(function() {
    User.create(userSeed).catch(e => {
      console.log(e);
    });
  });
  Freight.find({}).remove(function() {
    Freight.create(freightSeed).catch(e => {
      console.log(e);
    });
  });
};
