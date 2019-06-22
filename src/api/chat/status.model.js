const Schema = mongoose.Schema;

const USER_STATUSES = {
  OFFLINE: 'OFFLINE',
  ONLINE: 'ONLINE'
};

const UserStatusSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },

    status: {
      type: String,
      default: USER_STATUSES.OFFLINE
    },

    last_connect: Date
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = {
  UserStatus: mongoose.model('UserStatus', UserStatusSchema),
  UserStatusSchema,
  USER_STATUSES
};
