const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    favourite: {
      type: Boolean,
      required: true,
    },
    id : {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);



const post = new mongoose.model("posts", postSchema);

module.exports = post;
