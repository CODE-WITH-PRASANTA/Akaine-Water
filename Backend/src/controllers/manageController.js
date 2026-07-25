const Stock = require("../models/manage");



// GET ALL

exports.getAllStock = async(req,res)=>{

try{

const data = await Stock.find()
.sort({
createdAt:-1
});


res.json({

success:true,

data:data

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// CREATE

exports.addStock = async(req,res)=>{


try{


console.log("REQUEST BODY:",req.body);



const stock = await Stock.create({

product:req.body.product,

productCode:req.body.productCode,

unit:req.body.unit,

purchaseDate:req.body.purchaseDate,

opening:Number(req.body.opening || 0),

received:Number(req.body.received || 0),

sold:Number(req.body.sold || 0),

current:
Number(req.body.opening || 0)
+
Number(req.body.received || 0)
-
Number(req.body.sold || 0),


supplierName:req.body.supplierName,

purchasePrice:req.body.purchasePrice,

sellingPrice:req.body.sellingPrice,

storageLocation:req.body.storageLocation,

remarks:req.body.remarks

});



res.status(201).json({

success:true,

message:"Stock Added",

data:stock

});


}
catch(error){


console.log(error);


res.status(400).json({

success:false,

message:error.message

});


}


};




// UPDATE

exports.updateStock = async(req,res)=>{

try{


const data = await Stock.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.json({

success:true,

data:data

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});


}

};




// DELETE

exports.deleteStock = async(req,res)=>{


try{


await Stock.findByIdAndDelete(req.params.id);


res.json({

success:true,

message:"Deleted"

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});


}


};



// SINGLE

exports.getStockById = async(req,res)=>{


try{


const data = await Stock.findById(req.params.id);


res.json({

success:true,

data:data

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};



// CSV

exports.exportStockCSV=(req,res)=>{

res.send("CSV Export");

};