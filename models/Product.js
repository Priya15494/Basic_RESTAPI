// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        productName: {
            type: String,
            default: ''
        },
        modelNo :{
            type :String,
            default : ''
        },
        description: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
            default: ''
        },
        subcategory: {
            type: String,
            default: ''
        },  
        availability:{
            type : Boolean,
            default : true
        },
        rating: {
            type: Number,
            default: 0
        },
        noOfSubmittedReviews: {
            type: Number,
            default: 0
        },
        seller : {
            type :String,
            default :0
        }
    }
)

mongoose.model('Product', productSchema);