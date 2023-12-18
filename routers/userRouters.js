const express = require('express');
const userController = require('../controllers/userControllers')

const router=express.Router();

router.get('/users',userController.getUsers);
router.get('/user/:id',userController.getUserById);
router.post('/user/add',userController.addUser);
router.put('/user/update/:id',userController.updateUser);
router.delete('/user/delete/:id',userController.deleteUser);


module.exports=router;