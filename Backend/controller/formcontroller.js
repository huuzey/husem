const FormModel = require("../model/form");
const Formsubmit = async (req, res) => {
  const { name, company, project, email, phone, url } = req.body;
  if (url) {
    const urls = await FormModel.findOne({ url: url });
    if (urls) {
      return res.status(204).json("already added");
    }
  }

  try {
    const newForm = new FormModel(req.body);
    const saved = await newForm.save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { Formsubmit };
