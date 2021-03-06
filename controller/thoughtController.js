const { User, Thought } = require("../model");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      );
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "No user found with that ID :(" })
            : res.json(thought)
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, // $set operator replaces the value of a field with the specified value
      // { $push: { thoughts: hought.id } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(500).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : // PUlling the thoughts from the user deleted/updating
            User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            ).then((user) =>
              !user
                ? res
                    .status(404)
                    .json({ message: "THought deleted but no user found" })
                : res.json({ message: "THought successfully deleted" })
            )
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ meaasage: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // { _id: req.params.reactionId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      // { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with this ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
