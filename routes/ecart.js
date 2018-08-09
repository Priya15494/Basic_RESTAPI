const express=require('express')
const router=express.Router();
const ecartcontroller = require('./../controllers/ecartController')
const appConfig = require("./../config/appConfig")

let setRouter=(app) =>{
    let baseUrl=appConfig.apiVersion+'/products';
    let cartUrl=appConfig.apiVersion+'/cart';

	app.post(cartUrl+'/addToCart',ecartcontroller.addProductsToCart);
	/**
	 * @api {post} /api/v1/cart/addToCart  Add To Cart
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 * @apiParam {String} productName productName of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {String} price price of the product passed as a body parameter
	 * @apiParam {String} category category of the product passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Item added to Cart successfully",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */




	app.post(cartUrl+'/delete/:productId',ecartcontroller.removeProductsFromCart);
	 /**
	 * @api {post} /api/v1/cart/delete/:productId  Delete product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Removed From Cart Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
  
    app.get(baseUrl+'/all',ecartcontroller.getAllProducts);
    	/**
	 * @api {get} /api/v1/products/all Get all Products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Product Details Found",
	    "status": 200,
	    "data": [
					{
				        productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/view/:productId',ecartcontroller.viewByProductId);
     /**
	 * @api {get} /api/v1/products/view/:productId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
	    			    productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/category/:category',ecartcontroller.viewByCategory);
    /**
	 * @api {get} /api/v1/products/view/by/category/:category Get Products by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
     * 
	 * @apiParam {String} category category of the Product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/create',ecartcontroller.createProduct);
    /**
	 * @api {post} /api/v1/products/create Create Product
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 * @apiParam {String} productName productName of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {String} price price of the product passed as a body parameter
	 * @apiParam {String} category category of the product passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Created successfully",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl+'/:productId/edit',ecartcontroller.editProductDetails);
    /**
	 * @api {put} /api/v1/products/:productId/edit Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						productId: "string",
						productName: "string",
                        description: "string",
                        availability: boolean,
						category: "string",
						modelNo: "string",
						price: number,
                        subcategory: "string",
                        rating:number,
                        noOfSubmittedReviews:number,
                        seller : "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    


    app.post(baseUrl+'/:productId/delete',ecartcontroller.deleteProduct);
     /**
	 * @api {post} /api/v1/products/:productId/delete Delete product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


}

module.exports={
    setRouter : setRouter
}