const Schema = require('mongoose').Schema;

const ConversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
      }
    ],

    messages: [
      {
        type: Schema.ObjectId,
        ref: 'Message',
        required: true
      }
    ]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = {
  Conversation: mongoose.model('Conversation', ConversationSchema),
  ConversationSchema
};
