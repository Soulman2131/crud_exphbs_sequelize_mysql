//
//On fait le rest du CRUD
//On aura deux EDIT => editUser && updateUser

const { Users } = require('../models');

//GET-ALL
exports.getUsers = async (req, res, next) => {
  await Users.findAll({ raw: true })
    .then(users => {
      res.render('home', { title: 'All Users', users });
      // res.json(users);
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

//EDIT && UPDATE
//EDIT USER
exports.editUser = async (req, res, next) => {
  const id = req.params.id;
  await Users.findOne({ where: { id: id }, raw: true })
    .then(user => res.render('edit', { user }))
    .catch(err => console.log(err));
};

//UPDATE USER
exports.updateUser = async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;

  await Users.update({ ...data }, { where: { id: id } })
    .then(user => {
      res.redirect('/');
      // console.log(user);
    })
    .catch(err => console.log(err));
};

//VIEW USER (SINGLE)
//On copie le EDIT USER
exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  await Users.findOne({ where: { id: id }, raw: true })
    .then(user => res.render('user', { user }))
    .catch(err => console.log(err));
};

//DELETE USER
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  await Users.destroy({ where: { id: id }, raw: true })
    .then(user => res.redirect('/'))
    .catch(err => console.log(err));
};
