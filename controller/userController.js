const { User, Thought } = require("../model");

module.exports = {
  // Getting all the users
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Getting a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Posting/Creating a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Putting/Updating
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //Delete user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : //   Deleting all the all user's associated thoughts
            Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: "User created no thought with this id!",
            })
          : res.json({ message: "User and thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Adding friend to a user
  addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $addToSet: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then((friend) =>
              !friend
                ? res
                    .status(404)
                    .json({ message: "No user found with that ID :(" })
                : res.json(friend)
            )
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $pull: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then((friend) =>
              !friend
                ? res
                    .status(404)
                    .json({ message: "No user found with that ID :(" })
                : res.json(friend)
            )
      )
      .catch((err) => res.status(500).json(err));
  },
};
