const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.get("/blogs", apiController.getBlogs);
router.post("/blogs", apiController.postBlog);
router.get("/blogs/:id", apiController.getBlog);
router.delete("/blogs/:id", apiController.deleteBlog);

module.exports = router;
