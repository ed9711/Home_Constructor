const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController");

// if one user in cookie/session
router.get("/:userId", userController.getOne);
// if no user
router.post("/", userController.postOne);
// re enter salary
router.put("/:userId", userController.putOne);
router.delete("/:userId", userController.deleteOne);

module.exports = router;