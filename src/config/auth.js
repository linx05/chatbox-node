module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'MyS3cr3tK3Y',
  jwtSession: false,
  ExpirationTime: 60 * 60 * 3600
};
