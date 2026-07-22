const mongoose = require("mongoose");


const StockSchema = new mongoose.Schema(
{
    product:{
        type:String,
        required:true,
        trim:true
    },


    productCode:{
        type:String,
        default:""
    },


    unit:{
        type:String,
        enum:["Pcs","Box","Ltr"],
        default:"Pcs"
    },


    purchaseDate:{
        type:Date,
        default:Date.now
    },


    opening:{
        type:Number,
        default:0
    },


    received:{
        type:Number,
        default:0
    },


    sold:{
        type:Number,
        default:0
    },


    current:{
        type:Number,
        default:0
    },


    supplierName:{
        type:String,
        default:""
    },


    purchasePrice:{
        type:String,
        default:"0"
    },


    sellingPrice:{
        type:String,
        default:"0"
    },


    storageLocation:{
        type:String,
        default:""
    },


    remarks:{
        type:String,
        default:""
    }

},
{
    timestamps:true
}
);



module.exports = mongoose.model(
    "Stock",
    StockSchema
);