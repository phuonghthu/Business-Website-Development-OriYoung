const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const Auth = require("../common/auth");

// router api user
//Use refresh token to re-issue accesstoken
router.post(
  "/refresh-token",
  Auth.authenticateRefreshToken,
  userController.refreshToken
);
router.post("/login", userController.handleLogin);
router.post("/register", userController.handleRegister);
router.put(
  "/update-info",
  Auth.authenticateToken,
  userController.updateInfoUser
);
router.get(
  "/get-info-mine",
  Auth.authenticateToken,
  userController.getInfoMine
);
router.put(
  "/change-password",
  Auth.authenticateToken,
  userController.changePassword
);

router.post("/forgot-password", userController.forgotPassword);

//admin
router.get(
  "/get-all-users",
  Auth.authenticateTokenAdmin,
  userController.getAllUsers
);
router.delete(
  "/delete-user/:id",
  Auth.authenticateTokenAdmin,
  userController.deleteUser
);
module.exports = router;
