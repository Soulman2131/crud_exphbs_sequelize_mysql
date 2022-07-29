const express = require('express');
const {
  createUser,
  displayUser,
  getUsers,
  editUser,
  updateUser,
  getUser,
  deleteUser
} = require('../controllers/usersCtrl');
const router = express.Router();

//Routes

router.route('/').get(getUsers);
router.route('/create').post(createUser).get(displayUser);

//EDIT
router.route('/edit/:id').get(editUser);
router.route('/update/:id').post(updateUser);

//VIEW
router.route('/user/:id').get(getUser);

//DELETE (on met GET && NON DELETE pour mettre au LocalHost)
router.route('/delete/:id').get(deleteUser);

module.exports = router;
