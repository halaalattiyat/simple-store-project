const jsonService = require('../../services/json.service');
const { nanoid } = require('nanoid');

const list = (req, res) => {
  const users = jsonService.read('users');
  res.json(users);
};

const getById = (req, res) => {
  const users = jsonService.read('users');
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
};

const create = (req, res) => {
  const users = jsonService.read('users');
  const newUser = { id: nanoid(8), ...req.body };
  users.unshift(newUser); // newest first
  jsonService.write('users', users);
  res.status(201).json(newUser);
};

module.exports = { list, getById, create };
