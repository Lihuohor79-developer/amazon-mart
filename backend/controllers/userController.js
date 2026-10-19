import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateOTP from "../utils/generateOTP.js";
import { sendVerificationOTP, sendResetOTP } from "../utils/sendEmail.js";
import { json } from "express";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerUser = handle(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

  if (existingUser) return res.status(400);
  json({ success: false, message: "User already exists" });

  const handledPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const handledOtp = await bcrypt.hash(otp, 10);
  const user = await User.create({
    name,
    email,
    phone,
    password: handledPassword,
    isVerified: false,
    verifyOtp: handledOtp,
    verifyOptExpire: new Date(Date.now() + 10 * 60 * 1000),
  });
  await sendVerificationOTP(user.email, user.name, otp);
  res.status(201).json({
    success: true,
    message: "Verification OTP send successfully.",
    email: user.email,
  });
});

export const verifyEmail = handle(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  if (user.isVerified)
    return res
      .status(400)
      .json({ success: false, message: "Email already verified" });

  if (
    !user.verifyOtp ||
    !user.verifyOptExpire ||
    user.verifyOptExpire < Date.now()
  )
    return res.status(400).json({
      success: false,
      message: "OTP expired. Please request a new OTP.",
    });

  const isOtpValid = await bcrypt.compare(otp, user.verifyOtp);
  if (!isOtpValid)
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  user.isVerified = true;
  user.verifyOtp = null;
  user.verifyOptExpire = null;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Email verified successfully." });
});

export const resendOtp = handle(async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  if (user.isVerified)
    return res
      .status(400)
      .json({ success: false, message: "Email already verified" });
  const otp = generateOTP();
  user.verifyOtp = await bcrypt.hash(otp, 10);
  user.verifyOtpExpire = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendVerificationOTP(user.email, user.name, otp);
  res.status(200).json({ success: true, message: "OTP sent successfully" });
});

export const loginUser = handle(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  if (!user.isVerified)
    return res
      .status(403)
      .json({ success: false, message: "Please verify your email first." });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export const forgotPassword = handle(async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  const otp = generateOTP();
  user.resetOtp = await bcrypt.hash(otp, 10);
  user.resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendResetOTP(user.email, user.name, otp);
  res
    .status(200)
    .json({ success: true, message: "Password reset OTP sent successfully." });
});

export const resetPassword = handle(async (req, res) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password)
    return res.status(400).json({
      success: false,
      message: "Email, OTP and password are required",
    });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  if (
    !user.resetOtp ||
    !user.resetOtpExpire ||
    user.resetOtpExpire < Date.now()
  )
    return res.status(400).json({
      success: false,
      message: "OTP expired. Please request a new OTP.",
    });
  const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
  if (!isOtpValid)
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  user.password = await bcrypt.hash(password, 10);
  user.resetOtp = null;
  user.resetOtpExpire = null;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password reset successful." });
});

export const getProfile = handle(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
