const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Razorpay = require("razorpay");
const catchAsyncErrors = require("../middleware/catchasyncError");

exports.sendStripeKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripekey: process.env.STRIPE_API_KEY,
  });
});

exports.captureStripePayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",

    //optional
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    client_secret: paymentIntent.client_secret,
    //you can optionally send id as well
  });
});

// exports.sendRazorpayKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({
//     razorpaykey: process.env.RAZORPAY_API_KEY,
//   });
// });

// exports.captureRazorpayPayment = catchAsyncErrors(async (req, res, next) => {
//   var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,
//   });

//   var options = {
//     amount: req.body.amount, // amount in the smallest currency unit
//     currency: "INR",
//   };
//   const myOrder = await instance.orders.create(options);

//   res.status(200).json({
//     success: true,
//     amount: req.body.amount,
//     order: myOrder,
//   });
// });
