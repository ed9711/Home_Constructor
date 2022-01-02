const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController");

// if one user in cookie/session
router.get("/:userId", userController.getOne);
// re enter salary
router.put("/:userId", userController.putOne);
router.delete("/:userId", userController.deleteOne);
router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

module.exports = router;