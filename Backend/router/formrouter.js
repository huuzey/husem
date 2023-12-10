const express = require("express");
const { Formsubmit } = require("../controller/formcontroller");

const router = express.Router();

router.post("/create", Formsubmit);

module.exports = router;
