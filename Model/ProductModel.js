const mongoose=require("mongoose")

const schema=mongoose.Schema

const ProductSchema=new schema({
    catagory_id:{
        type:schema.Types.ObjectId,
        ref:"catagory",
        required:true
    },
    Brand_Name:{
        type:String,
        required:true
    }
   
})

const ProductModel=mongoose.model("product",ProductSchema)
module.exports=ProductModel