const express = require('express')
const router = express.Router();
const modelController = require("../controllers/modelController");

router.get("/", modelController.getAll);
router.get("/:modelId", modelController.getOne);
router.post("/", modelController.postOne);
router.put("/:modelId", modelController.putOne);
router.delete("/:modelId", modelController.deleteOne);

module.exports = router;