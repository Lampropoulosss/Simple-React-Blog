const express = require("express");
const authController = require("../controllers/authController");
const { requireNoAuth } = require("../other/utilities");

const router = express.Router();

router.post("/login", requireNoAuth, authController.postLogin);
router.post("/register", requireNoAuth, authController.postRegister);

module.exports = router;
