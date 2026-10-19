import Hookah from "../models/Hookah.js";
import cloudinary from "../config/cloudinary.js";

export const addHookah = async (req, res) => {
  try {
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    const hookah = await Hookah.create({
      image: { url: image.url, public_id: image.public_id },
      name,
      company,
      sellingPrice,
      oldPrice,
      size,
    });
    res
      .status(201)
      .json({ success: true, message: "Hookah added successfully", hookah });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHookahs = async (req, res) => {
  try {
    const hookahs = await Hookah.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: hookahs.length, hookahs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHookah = async (req, res) => {
  try {
    const hookah = await Hookah.findById(req.params.id);
    if (!hookah)
      return res
        .status(404)
        .json({ success: false, message: "Hookah not found" });
    res.status(200).json({ success: true, hookah });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHookah = async (req, res) => {
  try {
    const hookah = await Hookah.findById(req.params.id);
    if (!hookah)
      return res
        .status(404)
        .json({ success: false, message: "Hookah not found" });
    const { image, name, company, sellingPrice, oldPrice, size } = req.body;
    let oldImagePublicId = null;
    if (
      image?.url &&
      image?.public_id &&
      hookah.image?.public_id !== image.public_id
    ) {
      oldImagePublicId = hookah.image?.public_id;
      hookah.image = { url: image.url, public_id: image.public_id };
    }
    if (name) hookah.name = name;
    if (company) hookah.company = company;
    if (sellingPrice !== undefined) hookah.sellingPrice = sellingPrice;
    if (oldPrice !== undefined) hookah.oldPrice = oldPrice;
    if (size) hookah.size = size;
    await hookah.save();
    if (oldImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldImagePublicId, {
          invalidate: true,
        });
      } catch (cleanupError) {
        console.log("Old hookah image cleanup failed:", cleanupError.message);
      }
    }
    res
      .status(200)
      .json({ success: true, message: "Hookah Updated Successfully", hookah });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHookah = async (req, res) => {
  try {
    const hookah = await Hookah.findById(req.params.id);
    if (!hookah)
      return res
        .status(404)
        .json({ success: false, message: "Hookah not found" });

    if (hookah.image?.public_id)
      await cloudinary.uploader.destroy(hookah.image.public_id, {
        invalidate: true,
      });
    await Hookah.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Hookah Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
