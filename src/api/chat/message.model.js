const idvalidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

mongoose.plugin(idvalidator);
mongoose.plugin(uniqueValidator);

const MessageSchema = new Schema(
  {
    users: [
      {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
      }
    ],

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

module.exports = {
  Message: mongoose.model('Message', MessageSchema),
  MessageSchema: MessageSchema
};
