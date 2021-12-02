const express = require('express')
const router = express.Router();
const pricesController = require("../controllers/pricesController");
router.get("/", pricesController.get);
module.exports = router;