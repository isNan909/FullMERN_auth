// Route for autht
// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/users");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");

//Require auth middleware
const auth = require("../middlewares/auth");

//@route GET api/auth
//@desc authenticate and get user
//@acess Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await userSchema.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// User Signin
router.post("/signin-user", (req, res) => {
  let getUser;
  //Find the user return him a token
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      payload = {
        user: {
          email: getUser.email,
          userId: getUser._id,
        },
      };

      let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        token: jwtToken,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Authentication failed",
      });
    });
});

// Signup User
router.post(
  "/register-user",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Name must be atleast  characters long"),
    check("email", "Email is not valid").not().isEmpty().isEmail(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });

        user
          .save()
          .then((response) => {
            if (!response) {
              return res.status(401).json({
                message: "Authentication failed",
              });
            }

            //jwt payload
            payload = {
              user: {
                email: user.email,
                userId: user._id,
              },
            };
            //jwt signature
            let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
              expiresIn: "1h",
            });
            //Send authorization token
            return res.status(200).json({
              token: jwtToken,
            });
          })

          .catch((error) => {
            res.status(500).json({
              error: error,
            });
            console.log(error);
          });
      });
    }
  }
);

// Get All Users
router.route("/all-user").get(authorize, (req, res) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

// Get A Single User
router.route("/profile-user/:id").get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Delete A User
router.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
