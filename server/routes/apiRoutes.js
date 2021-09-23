const express = require("express");
const apiController = require("../controllers/apiController");
const { requireAdmin, requireContributor } = require("../other/utilities");

const router = express.Router();

router.get("/blogs", apiController.getBlogs);
router.post("/blogs", requireContributor, apiController.postBlog);
router.get("/blogs/:id", apiController.getBlog);
router.delete("/blogs/:id", requireAdmin, apiController.deleteBlog);

module.exports = router;
