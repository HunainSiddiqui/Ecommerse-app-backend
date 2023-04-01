const express = require('express');
const { getAllproducts,creatProduct , updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteReview } = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authuser');


const router = express.Router();

router.route("/products").get(getAllproducts)

router.route("/admin/products").get(isAuthenticatedUser,getAllproducts)
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),creatProduct)

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetail);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router ;