import Order from "../models/Order.js";
import Address from "../models/Address.js";

export const placeOrder = async (req, res) => {
  try {
    if (["Online", "Stripe"].includes(req.body.paymentMethod))
      return res.status(400).json({
        success: false,
        message: "Online orders are created only after successfully payment",
      });
    const address = await Address.findOne({
      _id: req.body.address,
      user: req.user._id,
    });
    if (!address)
      return res.status(400).json({
        success: false,
        message: "Please add a delivery address first",
      });

    const order = await Order.create({
      user: req.user._id,
      ...req.body,
      paymentMethod: "COD",
      paymentStatus: "Pending",
    });
    res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("address")
      .populate("user", "-password");

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    res
      .status(200)
      .json({ success: true, message: "Order Updated Successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    res
      .status(200)
      .json({ success: true, message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id })
      .populate("products.product")
      .populate("address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: order.length, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
