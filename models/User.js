const { Schema, model } = require("mongoose");
const moment = require("moment");

var validateEmail = function (email) {
  var re = /.+\@.+\..+/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Username is required.",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Please enter a valid email address."],
      //   match: [/.+\@.+\..+/, 'Please enter a valid email address.']
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//get total amount of friends returned in an array
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
