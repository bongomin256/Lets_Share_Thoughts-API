const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now }, //Use a getter method to format the timestamp on query
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// creating a virtual property 'reactionCount' that retrieves the length of the user's friends array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Post model/ creating an instance
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
