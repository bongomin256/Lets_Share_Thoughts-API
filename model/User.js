const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true, trim: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email adress"],
    },
    thoughts: [
      {
        // Array of _id values referencing the Thought model
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        // Array of _id values referencing the Thought model
        type: Schema.Types.ObjectId,
        ref: this,
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// creating a virtual property 'friendCount' that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

// Initialize our Post model/ creating an instance
const User = model("User", userSchema);

//Exporting the user model
module.exports = User;
