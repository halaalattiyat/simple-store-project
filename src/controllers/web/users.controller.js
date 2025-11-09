const jsonService = require('../../services/json.service');

const list = (req, res) => {
  const users = jsonService.read('users');
  res.render('users', { users });
};

module.exports = { list };
