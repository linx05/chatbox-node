const conf = require('../../config/auth');
const crypto = require('crypto');
const idvalidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

mongoose.plugin(idvalidator);
mongoose.plugin(uniqueValidator);

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },

    to: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    data: {
      type: String,
      required: true
    },

    read: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

MessageSchema.statics.encrypt = function(data) {
  let cipher = crypto.createCipher('aes-256-cbc', conf.jwtSecret);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

MessageSchema.statics.decrypt = function(data) {
  let decipher = crypto.createDecipher('aes-256-cbc', conf.jwtSecret);
  let dec = decipher.update(data, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

MessageSchema.pre('save', function(next) {
  const message = this;
  message.data = MessageSchema.statics.encrypt(message.data);
  next();
});

MessageSchema.post('find', function(messages) {
  messages.forEach(
    message => (message.data = MessageSchema.statics.decrypt(message.data))
  );
});

module.exports = {
  Message: mongoose.model('Message', MessageSchema),
  MessageSchema: MessageSchema
};
