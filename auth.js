const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./models');
const config = require('./config');

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword });
}

async function login(username, password) {
  const user = await User.findOne({ where: { username } });
  if (!user) return null;
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return null;
  const token = jwt.sign({ id: user.id }, config.secret);
  return token;
}

module.exports = {
  register,
  login,
};