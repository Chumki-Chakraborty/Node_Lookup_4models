const mongoose=require("mongoose")

const schema=mongoose.Schema

const PriceSchema=new schema({
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
    modelname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },

})

const PriceModel=mongoose.model("price",PriceSchema)
module.exports=PriceModel