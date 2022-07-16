const express=require('express');
const router=express.Router();
const {getUsers,addUser,removeUser}=require('../controller/usersController');
const {decorateHtmlResponse}=require('../middleware/common/decorateHtmlResponse');
const avatarUpload=require('../middleware/users/avatarUpload');
const {addUserValidators,addUserValidationHandler}=require('../middleware/users/userValidation');
const {checkLogin}=require('../middleware/common/checkLogin');
router.get('/',decorateHtmlResponse("User"),checkLogin,getUsers);

router.post(
    '/',
    checkLogin,
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
);

router.delete('/:id',removeUser);

module.exports=router;