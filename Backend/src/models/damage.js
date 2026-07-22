const mongoose = require("mongoose");


const DamageSchema = new mongoose.Schema(
{
    product:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },


    damages:[
        {
            reason:{
                type:String,
                enum:[
                    "Broken",
                    "Leakage",
                    "Lost",
                    "Customer Damage"
                ]
            },

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
            },

            total:{
                type:Number,
                default:0
            }
        }
    ]

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "DamagedStock",
    DamageSchema
);