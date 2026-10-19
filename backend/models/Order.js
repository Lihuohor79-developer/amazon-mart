import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productModel: {
          type: String,
          enum: ["Product", "Hookah"],
          default: "Product",
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "products.productModel",
          required: true,
        },
        quantity: { type: Number, default: 1, required: true },
        name: String,
        image: String,
        company: String,
        category: String,
        size: String,
        sellingPrice: Number,
        oldPrice: Number,
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "Stripe", "Online"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "On the Way", "Delivered", "Cancelled"],
      default: "Processing",
    },

    stripeSessionId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
