const mongoose = require("mongoose");


const volumeSchema = new mongoose.Schema(
{
    v20L:{
        type:Number,
        default:0
    },

    v10L:{
        type:Number,
        default:0
    },

    v5L:{
        type:Number,
        default:0
    },

    v1L:{
        type:Number,
        default:0
    }

},
{
    _id:false
}
);



const damagedStockSchema = new mongoose.Schema(
{

    // Manage Stock Product ID or Name
    product:{
        type:String,
        required:true
    },


    // Dynamic Category from Manage Stock
    category:{
        type:String,
        required:true
    },


    // Dynamic volumes from Manage Stock
    volumes:{
        type:[String],
        default:[
            "20L",
            "10L",
            "5L",
            "1L"
        ]
    },


    broken:{
        type:volumeSchema,
        default:{}
    },


    leakage:{
        type:volumeSchema,
        default:{}
    },


    lost:{
        type:volumeSchema,
        default:{}
    },


    customerDamage:{
        type:volumeSchema,
        default:{}
    }


},
{
    timestamps:true
}
);



module.exports = mongoose.model(
    "DamagedStock",
    damagedStockSchema
);