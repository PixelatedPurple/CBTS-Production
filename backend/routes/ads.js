const express = require("express");
const adsController = require("../controllers/adsController");

const router = express.Router();

router.get("/", adsController.getAds);

module.exports = router;
