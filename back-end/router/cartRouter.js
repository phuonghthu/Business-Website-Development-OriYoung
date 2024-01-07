const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const Auth = require("../common/auth");

//get cart by user id
router.get(
  "/get-cart-by-user-id",
  Auth.authenticateToken,
  cartController.getCartByUserId
);
//add product to cart
router.post(
  "/add-product-to-cart",
  Auth.authenticateToken,
  cartController.addProductToCart
);

//update product in cart
router.put(
  "/update-product-in-cart",
  Auth.authenticateToken,
  cartController.updateProductInCart
);

//delete product in cart
router.delete(
  "/delete-product-in-cart/:productId",
  Auth.authenticateToken,
  cartController.deleteProductInCart
);
module.exports = router;
