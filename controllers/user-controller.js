const { User } = require("../models");

const userController = {

  // get all Users (GET)
  getAllUsers(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // get one User by id (GET)
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate("thought")
      .populate("friends")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json(err);
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //create a User (POST)
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // update the User by adding a friend (PUT)
  addFriends({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json(err);
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // update the User (PUT)
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json(err);
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a friend (PUT)
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
  
  // delete a User (DELETE)
  deleteUser(req, res) {
    console.log("deleted User");
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        console.log("User");
        console.log(dbUserData);
        if (!dbUserData) {
          return res.status(404).json({ message: "User not found!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
