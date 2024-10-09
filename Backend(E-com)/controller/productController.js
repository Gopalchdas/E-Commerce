import { asyncerror } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Product } from "../models/productSchema.js";
import cloudinary from "cloudinary";

//Add New product
export const addProduct = asyncerror(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Product image required!", 400));
  }
  const { product_img } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(product_img.mimetype)) {
    return next(new ErrorHandler("File Format not supported !", 400));
  }
  const { name,description, category, new_price, old_price } = req.body;
  if (!name || !description || !category || !new_price || !old_price) {
    return next(new ErrorHandler("please provide valid product data!", 400));
  }
  const isAdded = await Product.findOne({ name });
  if (isAdded) {
    return next(
      new ErrorHandler(`${isAdded.name} with this name is already added`)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    product_img.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error",
      cloudinaryResponse.error || "unknown cloudinary error"
    );
  }
  const product = await Product.create({
    name,
    description,
    category,
    new_price,
    old_price,
    product_img: {
      public_id: cloudinaryResponse.public,
      url: cloudinaryResponse.secure_url,
    },

  });

  res.status(200).json({
    success: true,
    message: "product added succesfully",
    product,
  });
});

//get all products
export const getAllProducts = asyncerror(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//update product 
export const updateProduct = asyncerror(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Appointment not found", 404));
    }
    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, //ensure return the updated item
      runValidators: true, //ensures that validators defined in schema is runs when update Operation execuetes
      useFindAndModify: false, //ensures mongoose use FindOneupdate()method rather then findandmodify
    });
    res.status(200).json({
      success: true,
      message: "product status updated",
      product,
    });
  });
  
  //delete Product
  export const deleteProduct = asyncerror(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  });
  