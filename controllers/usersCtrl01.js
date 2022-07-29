//
const { Users } = require('../models');

//GET-ALL
exports.getUsers = async (req, res, next) => {
  await Users.findAll({ raw: true })
    .then(users => {
      res.render('home', { title: 'All Users', users });
    })
    .catch(err => console.log(err));
};

//POST & DISPLAY

//1- POST AN USER
exports.createUser = async (req, res, next) => {
  const { name, email, phone } = req.body;

  await Users.create({ name, email, phone })
    .then(user => {
      res.redirect('/');
      console.log(user);
    })
    .catch(err => console.log(err));
};

//2- DISPLAY AN USER
exports.displayUser = async (req, res, next) => {
  res.render('create', { title: 'Create User' });
};
