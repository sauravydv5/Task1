const { Router } = require("express");
const { body } = require("express-validator");
const { signup } = require("../controllers/user-controller");
const { asyncHandler } = require("../utils/asyncHandler");

const router = Router();

router.post(
  "/signup",
  [
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  asyncHandler(signup)
);

module.exports = router;
