const Utils = require("../common/utils");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");
const InvoiceItem = require("../models/InvoiceItem");

const createPaymentIntent = async (req, res) => {
  try {
    const {
      products,
      buyerName,
      address,
      phoneNumber,
      totalQuantity,
      totalMoney,
    } = req.body;
    //create invoice
    const invoice = new Invoice({
      user: req.user.id,
      buyerName,
      address,
      phoneNumber,
      totalQuantity,
      totalMoney,
    });
    await invoice.save();
    //create invoice items
    await Promise.all(
      products.map(async (p) => {
        const product = await Product.findById(p.Id);
        const invoiceItem = new InvoiceItem({
          invoiceId: invoice._id,
          productId: product._id,
          productName: product.name,
          capacity: product.capacity,
          capacityPrice: product.price,
          quantity: p.quantity,
          totalPrice: p.quantity * product.price,
        });
        await invoiceItem.save();
        //minus the number of products sold
        product.quantity -= p.quantity;
        await product.save();
      })
    );

    //delete cart of user if payment success
    await Cart.deleteMany({ userId: req.user.id });
    return res.json(Utils.createSuccessResponseModel());
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const deleteCartOfUser = async (req, res) => {
  await Cart.deleteMany({ userId: req.user.id });
  return res.json(Utils.createSuccessResponseModel());
};

module.exports = {
  createPaymentIntent: createPaymentIntent,
  deleteCartOfUser: deleteCartOfUser,
};
