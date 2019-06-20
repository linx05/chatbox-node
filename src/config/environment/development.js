// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri:
      process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      'mongodb://unidosadmin:UnidosPassword@ds159328.mlab.com:59328/unidos-transport-backup'
  }
};
