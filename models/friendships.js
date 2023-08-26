const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    from_user: {
      // the user who sent this request
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to_user: {
      // the user who will accept the request and relationship betn userID will be formed
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
