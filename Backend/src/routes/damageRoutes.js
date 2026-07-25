const express=require("express");

const router=express.Router();


const {

addDamagedStock,
getDamagedStockSummary,
downloadDamagedStockCSV

}=require("../controllers/damageController");



router.get("/",getDamagedStockSummary);

router.post("/",addDamagedStock);

router.get("/download",downloadDamagedStockCSV);



module.exports=router;