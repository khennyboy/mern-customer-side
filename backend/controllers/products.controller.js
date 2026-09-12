import Product from "../models/products.model.js";

const limit = 10;
// get products
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      pageSize: limit,
    });
  } catch (error) {
    console.error("Error getting products:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};