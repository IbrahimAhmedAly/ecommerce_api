const User = require("../models/User");

// REGISTER
const register = async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByCredentials(email, req.body.password);
    const accessToken = user.generateAuthToken();
    res.status(200).send({ ...user._doc, accessToken });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  register,
  login,
};
