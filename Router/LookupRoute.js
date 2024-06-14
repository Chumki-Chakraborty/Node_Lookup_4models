const express=require("express")
const LookupController = require("../Controller/LookupController")

const LookupRoute=express.Router()

LookupRoute.post("/add/catagory",LookupController.AddCatagory)
LookupRoute.get("/getcatagorydata",LookupController.AllCatagory)

LookupRoute.post("/add/product",LookupController.AddProduct)
LookupRoute.get("/All/product/data",LookupController.AllProduct)

LookupRoute.post("/add/price",LookupController.AddPrice)
LookupRoute.get("/get/price",LookupController.AllPriceDetails)

LookupRoute.post("/add/review",LookupController.AddReview)
LookupRoute.get("/all/review",LookupController.AllReview)
LookupRoute.post("/update/review/:id",LookupController.UpdateReview)

module.exports=LookupRoute