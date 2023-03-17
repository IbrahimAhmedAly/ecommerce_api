const User = require("../models/User");

// UPDATE USER
const updateUser = async (req, res) => {
  if (req.body.password) {
    await User.save();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send({ ...others });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getUsers };
