const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController.js");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authuser");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/order/:id").get( getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
