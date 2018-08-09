const express = require('express')
const mongoose=require('mongoose')
const shortid = require('shortid');

//libs
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')

/* Models */
const productModel = mongoose.model('Product')
const cartModel=mongoose.model('Product')


/**
 * function to add products to cart.
 */
let addProductsToCart = (req, res) => {
    let addToCartCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.productId) || check.isEmpty(req.body.productName) || check.isEmpty(req.body.price) || 
            check.isEmpty(req.body.description) || check.isEmpty(req.body.category)) {
                logger.error("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } 
            else {
                var today = Date.now()
                let productId = shortid.generate()

                let newProductToCart = new cartModel({

                    productId: productId,
                    productName: req.body.productName,
                    description: req.body.description,
                    availability: true,
                    category: req.body.category,
                    modelNo: req.body.modelNo,
                    price: req.body.price,
                    subcategory: req.body.subcategory,
                    rating: req.body.rating,
                    noOfSubmittedReviews: req.body.noOfSubmittedReviews,
                    seller : req.body.seller
                }) // end new cart model

                newProductToCart.save((err, result) => {
                    if (err) {
                        
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        logger.info('Added to Cart Successfully')
                        resolve(result)
                    }
                }) // end add product to cart save
            }
        }) // end add product to cart  promise
    } // end add cart to  product function

    // making promise call.
    addToCartCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Product Added to Cart successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/**
 * function to remove product from cart
 */
let removeProductsFromCart = (req, res) => {

    if (check.isEmpty(req.params.productId)) {
        logger.error('ProductID should be passed')
        let apiResponse = response.generate(true, 'productID is missing', 403, null)
        res.send(apiResponse)
    } else {
        cartModel.remove({ 'productId': req.params.productId}, (err, result) => {
            if (err) {
                
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (result.n==0) {
                logger.info.log('Product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Item removal from Cart Success')
                let apiResponse = response.generate(false, 'Product Removed from cart Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
  }
  

/**
 * function to read all products.
 */
let getAllProducts = (req, res) => {
  productModel.find()
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
          if (err) {
              
              logger.error(err.message, 'ecart Controller: getAllProducts', 10)
              let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
              res.send(apiResponse)
          } else if (check.isEmpty(result)) {
              logger.info('No Product Found', 'ecart Controller: getAllProducts')
              let apiResponse = response.generate(true, 'No Product Found', 404, null)
              res.send(apiResponse)
          } else {
              let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
              res.send(apiResponse)
          }
      })
}// end get all products

/**
 * function to read single product.
 */
let viewByProductId = (req, res) => {
  if (check.isEmpty(req.params.productId)) {
      logger.error('Product ID should be passed')
      let apiResponse = response.generate(true, 'productID is missing', 403, null)
      res.send(apiResponse)
  } else {
        productModel.findOne({ 'productId': req.params.productId }, (err, result) => {
          if (err) {
             
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              res.send(apiResponse)
          } else if (check.isEmpty(result)) {
              logger.info('Product Not Found.')
              let apiResponse = response.generate(true, 'Product Not Found', 404, null)
              res.send(apiResponse)
          } else {
              logger.info("Product found successfully","ecartController:viewByProductId",5)
              let apiResponse = response.generate(false, 'Product Found Successfully.', 200, result)
              res.send(apiResponse)
          }
      })
  }
}

/**
 * function to read products by category.
 */
let viewByCategory = (req, res) => {

  if (check.isEmpty(req.params.category)) {
      logger.error('categoryname should be passed')
      let apiResponse = response.generate(true, 'Category is missing', 403, null)
      res.send(apiResponse)
  } else {
      productModel.find({ 'category': req.params.category }, (err, result) => {
          if (err) {
             
              logger.error(`Error Occured : ${err}`, 'Database', 10)
              let apiResponse = response.generate(true, 'Error Occured.', 500, null)
              res.send(apiResponse)
          } else if (check.isEmpty(result)) {

              logger.info('Products Not Found.')
              let apiResponse = response.generate(true, 'Products Not Found under this category', 404, null)
              res.send(apiResponse)
          } else {
              logger.info('Products Found Successfully within the category')
              let apiResponse = response.generate(false, 'Products Found Successfully.', 200, result)
              res.send(apiResponse)
          }
      })
  }
}

/**
 * function to delete the assignment collection.
 */
let deleteProduct = (req, res) => {

    if (check.isEmpty(req.params.productId)) {

        logger.error('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        productModel.remove({ 'productId': req.params.productId }, (err, result) => {
           
            if (err) {
                
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (result.n==0) {
                logger.info('Product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Deleted Successfully')
                let apiResponse = response.generate(false, 'Product Deleted Successfully', 200, result)
                res.send(apiResponse)
            } 
        })
    }
}


/**
 * function to create the product.
 */
let createProduct = (req, res) => {
    let productCreationFunction = () => {
        return new Promise((resolve, reject) => {
            
            if (check.isEmpty(req.body.productName) || check.isEmpty(req.body.price) || check.isEmpty(req.body.description) || check.isEmpty(req.body.category)) {
                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                var today = Date.now()
                let productId = shortid.generate()

                let newProduct = new productModel({

                    productId: productId,
                    productName: req.body.productName,
                    description: req.body.description,
                    availability: true,
                    category: req.body.category,
                    modelNo: req.body.modelNo,
                    price: req.body.price,
                    subcategory: req.body.subcategory,
                    rating: req.body.rating,
                    noOfSubmittedReviews: req.body.noOfSubmittedReviews,
                    seller : req.body.seller
                }) // end new product model

                newProduct.save((err, result) => {
                    if (err) {
                       
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        logger.info('Success in Product creation')
                        resolve(result)
                    }
                }) // end new product save
            }
        }) // end new product promise
    } // end create product function

    // making promise call.
    productCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Product Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            logger.error(error)
            res.send(error)
        })
}

   /**
 * function to edit product details
 */
let editProductDetails = (req, res) => {

    if (check.isEmpty(req.params.productId)) {

        logger.error('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        let options = req.body;
        
        productModel.update({ 'productId': req.params.productId }, options, { multi: true }).exec((err, result) => {
            console.log(result.nModified+"dsfa"+result.n)
            if (err) {
                
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (result.nModified==0) {
                logger.info('Product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Product Edited Successfully')
                let apiResponse = response.generate(false, 'Product details Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

  module.exports = {
    addProductsToCart :addProductsToCart,
    removeProductsFromCart:removeProductsFromCart,
    getAllProducts: getAllProducts,
    viewByProductId: viewByProductId,
    viewByCategory: viewByCategory,
    createProduct: createProduct,
    editProductDetails: editProductDetails,
    deleteProduct: deleteProduct
}
