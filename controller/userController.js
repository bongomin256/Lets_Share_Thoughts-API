const { User, Thought } = require("../model");

module.exports = {
  // Getting all the users
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Getting a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thought")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      );
  },
  //Posting/Creating a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
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
            Thought.deleteMany({ username: dbUserData.username })
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: "User created no thought with this id!",
            })
          : res.json({ message: "User successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
