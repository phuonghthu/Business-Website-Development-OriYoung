const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const Auth = require("../common/auth");

router.post(
  "/create-payment-intent",
  Auth.authenticateToken,
  paymentController.deleteCartOfUser
);

module.exports = router;
