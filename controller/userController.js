const { User, Thought } = require("../model");

module.exports = {
  // Getting all the users
  getUsers(req, res) {
    User.find()
      // .populate("thoughts")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Getting a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .populate("thought")
      // .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      );
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
      { $addToSet: { friend: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { frienId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
