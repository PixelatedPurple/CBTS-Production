const express = require("express");
const chatsController = require("../controllers/chatsController");

const router = express.Router();

router.get("/:userId", chatsController.getChats);
router.post("/", chatsController.sendMessage);

module.exports = router;
