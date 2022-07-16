const express=require('express');
const router=express.Router();
const {getLogin,login,logout}=require('../controller/loginController');
const {decorateHtmlResponse}=require('../middleware/common/decorateHtmlResponse');
const {loginvalidationResult,loginvalidator}=require('../middleware/login/loginValidator');
const {redirectLoggedIn}=require('../middleware/common/checkLogin');

const page_title="Login";
router.get('/', decorateHtmlResponse(page_title),redirectLoggedIn,getLogin);

router.post('/',
    decorateHtmlResponse(page_title),
    loginvalidator,
    loginvalidationResult,
    login
);

router.delete("/",logout);

module.exports=router;