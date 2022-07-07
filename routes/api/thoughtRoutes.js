const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controller/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
