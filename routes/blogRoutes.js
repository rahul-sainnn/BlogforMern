const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
} = require("../controllers/blogControllers");
const router = express.Router();

router.route("/blogs").post(createBlog).get(getBlogs);

router.route("/blogs/:id").get(getBlogById).put(updateBlog);

module.exports = router;
