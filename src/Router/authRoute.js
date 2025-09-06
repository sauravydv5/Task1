const { Router } = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/user-controller");
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
router.post(
  "/login",
  [body("email").isEmail(), body("password").isString()],
  asyncHandler(login)
);

module.exports = router;
