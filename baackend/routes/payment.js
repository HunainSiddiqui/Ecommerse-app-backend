const express = require("express");
const router = express.Router();
const {
//   sendRazorpayKey,
  sendStripeKey,
  captureStripePayment,
//   captureRazorpayPayment,
} = require("../controllers/paymentController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authuser');

router.route("/stripekey").get(isAuthenticatedUser, sendStripeKey);
// router.route("/razorpaykey").get(isLoggedIn, sendRazorpayKey);

router.route("/capturestripe").post(isAuthenticatedUser, captureStripePayment);
// router.route("/capturerazorpay").post(isLoggedIn, captureRazorpayPayment);

module.exports = router;




