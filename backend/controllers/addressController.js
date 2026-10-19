import Address from "../models/Address.js";

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = handle(async (req, res) => {
  const address = await Address.create({ user: req.user._id, ...req.body });
  res
    .status(201)
    .json({ success: true, message: "Address Added Successfully", address });
});

export const getAddresses = handle(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, count: addAddress.length, addresses });
});

export const updateAddress = handle(async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { returnDocument: "after" },
  );
  if (!address)
    return res
      .status(404)
      .json({ success: false, message: "Address Not Found" });

  res
    .status(200)
    .json({ success: true, message: "Address Updated Successfully", address });
});

export const deleteAddress = handle(async (req, res) => {
  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!address)
    return res
      .status(404)
      .json({ success: false, message: "Address Not Found" });

  res
    .status(200)
    .json({ success: true, message: "Address Deleted Successfully" });
});
