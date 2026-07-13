const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/blog");

},


filename:(req,file,cb)=>{

const uniqueName =
Date.now()+"-"+Math.round(Math.random()*9999)
+path.extname(file.originalname);


cb(null,uniqueName);

}

});


const upload = multer({

storage:storage,

fileFilter:(req,file,cb)=>{

const allowed=[
"image/jpeg",
"image/png",
"image/jpg",
"image/webp"
];


if(allowed.includes(file.mimetype)){

cb(null,true);

}else{

cb(new Error("Only image allowed"));

}

}


});


module.exports=upload;