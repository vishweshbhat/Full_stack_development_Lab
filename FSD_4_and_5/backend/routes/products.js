import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (with image)
router.post("/", upload.single("image"), async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  });
  await newProduct.save();
  res.json(newProduct);
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    name: req.body.name,
    price: req.body.price
  };
  if (req.file) updateData.image = `/uploads/${req.file.filename}`;

  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
