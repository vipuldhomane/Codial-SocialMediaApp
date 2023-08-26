const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      refPath: "onModel", // this means likeable can be on onModel
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"], // The object that can be liked
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
