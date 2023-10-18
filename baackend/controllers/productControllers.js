const { query } = require("express");
const catchasyncError = require("../middleware/catchasyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeature.js");
const ErrorHandler = require("../utils/errorHandler");


exports.creatProduct = catchasyncError(async(req,res,next) => {
    req.body.user = req.user.id ;
    const product = await Product.create(req.body) ;

    res.status(201).json({
        success : true,
        product
    })
})

exports.updateProduct = catchasyncError(async(req,res) => {
    let product = await Product.findById(req.params.id)
    if(!product)
    {
       return next(new ErrorHandler("Product Not Found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true
    })
    res.status(200).json({
        success : true,
        product
    })
})

exports.deleteProduct =  catchasyncError(async(req,res) =>{
    let product = await Product.findById(req.params.id)
    if(!product)
    {
       return next(new ErrorHandler("Product Not Found",404))
    }
    await product.remove() ;
    res.status(200).json({
        success : true,
        message : "Product deleted Successfully"
    })

})



exports.getProductDetail = catchasyncError(async(req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product)
    {
       return next(new ErrorHandler("Product Not Found",404))
    }
    
    res.status(200).json({
        success : true,
        product
    })

})


exports.getAllproducts = catchasyncError(async(req,res)=>{
    let resultperpage = 5 ;
    let productCount  = await Product.countDocuments();
    const apifearture = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage) ;
    let products  = await apifearture.query;
   res.status(200).json({
    success : true,
    products,
    productCount


   })
})

// Create New Review or Update the review
exports.createProductReview = catchasyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a product
  exports.getProductReviews = catchasyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchasyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });