const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    return res.status(200).json({ data: createdUser });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    //select is used to select and de-select/remove fields from find result
    // `-` sign before any field name means this field will not be returned
    const users = await User.find().select("-password");
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newUser = await User.findByIdAndUpdate( id, req.body, {new: true});
  res.status(200).send(newUser);
});

module.exports = router;
