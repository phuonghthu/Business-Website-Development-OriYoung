const mongoose = require("mongoose");
//create invoice item schema
const invoiceItemSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  capacityPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
});

const InvoiceItem = mongoose.model("InvoiceItem", invoiceItemSchema);
module.exports = InvoiceItem;
