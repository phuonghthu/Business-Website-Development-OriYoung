const mongoose = require("mongoose");
//Invoice schema
const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  buyerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Thanh toán khi nhận hàng", "Thanh toán qua thẻ"],
    default: "Thanh toán khi nhận hàng",
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalMoney: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
