const express = require("express");
const { evalsubmit } = require("../controller/evalcontroller");

const router = express.Router();

router.post("/eval", evalsubmit);

module.exports = router;
