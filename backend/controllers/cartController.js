import Cart from "../models/Cart.js";

import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const productExists = await Product.findById(product);
    if (!productExists)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });

    const cartItem = await Cart.findOne({ user: req.user._id, product });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        cart: cartItem,
      });
    }

    const cart = await Cart.create({
      user: req.user_id,
      product,
      quantity: quantity || 1,
    });
    return res.status(201).json({
      success: true,
      message: "Product added to Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");
    res.status(200).json({ success: true, count: cart.length, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    res
      .status(200)
      .json({ success: true, message: "Cart Updated Successfully", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });

    res
      .status(200)
      .json({ success: true, message: "Product Remove From  Cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
