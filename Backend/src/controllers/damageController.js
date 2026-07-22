const DamagedStock = require("../models/damage");



exports.addDamagedStock = async(req,res)=>{

try{


console.log("DAMAGE BODY:",req.body);



const {
product,
category,

broken20L,
broken10L,
broken5L,
broken1L,

leakage20L,
leakage10L,
leakage5L,
leakage1L,


lost20L,
lost10L,
lost5L,
lost1L,


customerDamage20L,
customerDamage10L,
customerDamage5L,
customerDamage1L

}=req.body;



if(!product || !category)
{
return res.status(400).json({

success:false,
message:"Product and category required"

});
}



const damages=[

{
reason:"Broken",

v20L:Number(broken20L||0),
v10L:Number(broken10L||0),
v5L:Number(broken5L||0),
v1L:Number(broken1L||0),

total:
Number(broken20L||0)+
Number(broken10L||0)+
Number(broken5L||0)+
Number(broken1L||0)

},



{
reason:"Leakage",

v20L:Number(leakage20L||0),
v10L:Number(leakage10L||0),
v5L:Number(leakage5L||0),
v1L:Number(leakage1L||0),

total:
Number(leakage20L||0)+
Number(leakage10L||0)+
Number(leakage5L||0)+
Number(leakage1L||0)

},



{
reason:"Lost",

v20L:Number(lost20L||0),
v10L:Number(lost10L||0),
v5L:Number(lost5L||0),
v1L:Number(lost1L||0),

total:
Number(lost20L||0)+
Number(lost10L||0)+
Number(lost5L||0)+
Number(lost1L||0)

},



{
reason:"Customer Damage",

v20L:Number(customerDamage20L||0),
v10L:Number(customerDamage10L||0),
v5L:Number(customerDamage5L||0),
v1L:Number(customerDamage1L||0),

total:
Number(customerDamage20L||0)+
Number(customerDamage10L||0)+
Number(customerDamage5L||0)+
Number(customerDamage1L||0)

}

];



const data = new DamagedStock({

product,
category,
damages

});


await data.save();



res.status(201).json({

success:true,

message:"Damaged stock saved",

data

});



}
catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});


}

};





exports.getDamagedStockSummary = async(req,res)=>{


try{


const records = await DamagedStock.find()
.sort({
createdAt:-1
});



let summary={

totalDamaged:0,

Broken:0,

Leakage:0,

Lost:0,

"Customer Damage":0,

breakdown:{}

};



records.forEach(item=>{


item.damages.forEach(d=>{


if(!summary.breakdown[d.reason])
{

summary.breakdown[d.reason]={
"20L":0,
"10L":0,
"5L":0,
"1L":0
}

}



summary.breakdown[d.reason]["20L"] += d.v20L;

summary.breakdown[d.reason]["10L"] += d.v10L;

summary.breakdown[d.reason]["5L"] += d.v5L;

summary.breakdown[d.reason]["1L"] += d.v1L;



summary[d.reason]+=d.total;


summary.totalDamaged+=d.total;



});


});



res.json({

success:true,

data:records,

summary

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});


}


};





exports.downloadDamagedStockCSV=(req,res)=>{

res.send("CSV Export");

};