const mongoose=require("mongoose")

const schema=mongoose.Schema

const CatagorySchema=new schema({
    catagory:{
        type:String,
        required:true
    }
   
})

const CatagoryModel=mongoose.model("catagory",CatagorySchema)
module.exports=CatagoryModel