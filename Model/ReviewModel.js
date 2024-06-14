const mongoose=require("mongoose")

const schema=mongoose.Schema

const ReviewSchema=new schema({
    catagory_id:{
        type:schema.Types.ObjectId,
        ref:"catagory",
        required:true
    },
    Brand_id:{
        type:schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    model_id:{
        type:schema.Types.ObjectId,
        ref:"prices",
        required:true
    },
    review:{
        type:String,
        required:true
    },

})

const ReviewModel=mongoose.model("review",ReviewSchema)
module.exports=ReviewModel