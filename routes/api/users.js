const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    addFriends,
    createUser,
    updateUser,
    deleteFriend,
    deleteUser,
} = require("../../controllers/user-controller");

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
  .route("/:userId/friends/:friendId")
  .post(addFriends)
  .delete(deleteFriend);

module.exports = router;
