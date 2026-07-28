const express = require("express");

const router = express.Router();


const {

getAllStock,

getStockById,

addStock,

updateStock,

deleteStock,

exportStockCSV


}=require("../controllers/manageController");



router.get(
"/export-csv",
exportStockCSV
);



router.get(
"/",
getAllStock
);



router.post(
"/",
addStock
);



router.get(
"/:id",
getStockById
);



router.put(
"/:id",
updateStock
);



router.delete(
"/:id",
deleteStock
);



module.exports = router;