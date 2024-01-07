const Utils = require("../common/utils");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCartByUserId = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart === null) {
      cart = new Cart({ userId: req.user.id, products: [] });
      await cart.save();
      return res.json(Utils.createSuccessResponseModel(0, []));
    }

    // Get product information based on productId and add it to products, and also remove productId from that object.
    const productPromises = cart.products.map(async (product) => {
      const foundProduct = await Product.findById(product.productId);
      // Update product with productInfo and remove productId
      return { ...product.toObject(), productInfo: foundProduct.toObject() };
    });
    const products = (await Promise.all(productPromises)) ?? [];

    return res.json(
      Utils.createSuccessResponseModel(products.length, products)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart =
      (await Cart.findOne({ userId: req.user.id })) ||
      new Cart({ userId: req.user.id });

    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.price =
        existingProduct.capacityPrice * existingProduct.quantity;
    } else {
      const product = await Product.findById(productId);
      cart.products.push({
        productId: productId,
        capacity: product.capacity,
        capacityPrice: product.price,
        quantity: quantity,
        price: product.price * quantity,
      });
      product.save();
    }

    await cart.save();

    return res.json(
      Utils.createSuccessResponseModel("Thêm sản phẩm thành công", cart)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//update quantity and capacity of product in cart
const updateProductInCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;
      existingProduct.price = existingProduct.capacityPrice * quantity;
    }

    // If quantity is 0, remove product from cart
    if (existingProduct.quantity === 0) {
      cart.products.remove(existingProduct);
    }
    await cart.save();

    return res.json(
      Utils.createSuccessResponseModel("Cập nhật sản phẩm thành công", cart)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//delete product in cart
const deleteProductInCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cart = await Cart.findOne({ userId: req.user.id });
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      cart.products.splice(existingProductIndex, 1);
    }

    await cart.save();

    return res.json(
      Utils.createSuccessResponseModel(cart.products.length, cart)
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

module.exports = {
  getCartByUserId: getCartByUserId,
  addProductToCart: addProductToCart,
  updateProductInCart: updateProductInCart,
  deleteProductInCart: deleteProductInCart,
};
