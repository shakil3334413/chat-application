const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People")

const loginvalidator=[
    check("username")
      .isLength({ min: 1 })
      .withMessage("Email or Mobile Number  is required"),
      check("password")
      .isLength({ min: 1 })
      .withMessage(
        "Password is required"
      ),
];

const loginvalidationResult=function(req,res,next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      res.render("index", {
        data: {
          username: req.body.username,
        },
        errors: mappedErrors,
      });
    }
  }
module.exports={
    loginvalidator,
    loginvalidationResult,
}