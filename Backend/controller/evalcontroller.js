const evalmodel = require("../model/eval");

const evalsubmit = async (req, res) => {
  const sub = new evalmodel(req.body);
  try {
    await sub.save();

    res.status(201).json("successfully Submitted");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { evalsubmit };
