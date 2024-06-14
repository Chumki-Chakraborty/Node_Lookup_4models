const CatagoryModel = require("../Model/CatagoryModel")
const ProductModel=require("../Model/ProductModel")
const PriceModel=require("../Model/PriceModel")
const ReviewModel=require("../Model/ReviewModel")

class LookupController {

    AddCatagory = async (req, res) => {
        try {
            const { catagory } = req.body
            const add_catagory = new CatagoryModel({
                catagory
            })
            const response = await add_catagory.save()
            if (response) {
                return res.status(201).json({
                    message: "Catagory added...",
                    CatagoryData: response
                })
            }

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
    AllCatagory=async(req,res)=>{
        try{
            const allcatagory=await CatagoryModel.find()
            if(allcatagory){
                return res.status(201).json({
                    message:"All Catagory data get done..",
                    Data:allcatagory
                })
            }
        }catch(error){
            return res.status(404).json({
               error:error.message
            })
        }
    }
    // *********************AddProduct*****************//
    AddProduct=async(req,res)=>{
        try{
            const{catagory_id,Brand_Name}=req.body
            const addproduct=new ProductModel({
                catagory_id,Brand_Name
            })
            const response=await addproduct.save()
            if(response){
                return res.status(201).json({
                    message:"Product added done..",
                    addproduct:response
                })
            }
        }catch(error){
            return res.status(500).json({
                error:error.message
            })
        }
    }
    // ******************AllProduct************//
    AllProduct=async(req,res)=>{
       try{
        const getproduct=await ProductModel.aggregate([
            {$project:{__v:0}},
            {$sort:{id:-1}},
            {
                $lookup:{
                    from:"catagories",
                    localField:"catagory_id",
                    foreignField:"_id",
                    as:"Catagory Details"
                }
            }
        ])
        if(getproduct){
           return res.status(201).json({
             message:"All product data fetched ..",
             PData:getproduct
           })
        }
        
       }catch(error){
            return res.status(500).json({
                error:error.message
            })
       }
    }
    // ***************AddPrice**************//
    AddPrice=async(req,res)=>{
        try{
            const{catagory_id,Brand_id,modelname,price}=req.body
            const addprice=new PriceModel({
                catagory_id,Brand_id,modelname,price
            })
            const response=await addprice.save()
            if(response){
                return res.status(201).json({
                    message:"Price added done..",
                    pricedata:response
                })
            }
        }catch(error){
            return res.status(500).json({
                error:error.message
            })
        }
    }
    // ****************AllPriceDetails**************//
    AllPriceDetails=async(req,res)=>{
        try{
            const GetPrice=await PriceModel.aggregate([
                {$project:{__v:0}},
            {$sort:{id:-1}},
            {
                $lookup:{
                    from:'products',
                    localField:"Brand_id",
                    foreignField:"_id",
                    as:"product details",
                    pipeline:[
                        {
                            $lookup:{
                                from:'catagories',
                                localField:"catagory_id",
                                foreignField:"_id",
                                as:"catagory details",  
                            }
                        }
                    ],
                    as:"Product details"
                }
            }
            ])
            if(GetPrice){
                return res.status(201).json({
                    message:"All Price data get done..",
                    Pricedata:GetPrice
                })
            }
        }catch(error){
            return res.status(500).json({
                error:error.message
            })
        }
    }
    // ******************AddReview******************//
    AddReview=async(req,res)=>{
        try{
            const{catagory_id,Brand_id,model_id,review}=req.body
            const addreview=new ReviewModel({
                catagory_id,Brand_id,model_id,review
            })
            const response=await addreview.save()
            if(response){
                return res.status(201).json({
                    message:"Review added..",
                    ReviewDate:response
                })
            }
        }catch(error){
            return res.status(500).json({
               error:error.message
            })
        }
    }
    // ****************AllReview***************//
    AllReview=async(req,res)=>{
        try{
            const allreview=await ReviewModel.aggregate([
                {$project:{__v:0}},
                {$sort:{id:-1}},
                {
                    $lookup:{
                        from:"prices",
                        localField:"model_id",
                        foreignField:"_id",
                        as:"model details",
                        pipeline:[
                            {
                                $lookup:{
                                    from:"products",
                                    localField:"Brand_id",
                                    foreignField:"_id",
                                    as:"product details",
                                }
                            },
                            {
                                $lookup:{
                                    from:"catagories",
                                    localField:"catagory_id",
                                    foreignField:"_id",
                                    as:"Catagory details",
                                }
                            },

                        ],
                        as:"Model Details"
                    }
                }
            ])
            if(allreview){
                return res.status(201).json({
                    message:"All review get done..",
                    alldata:allreview
                })
            }
        }catch(error){
            return res.status(404).json({
                error:error.message
            })
        }
    }
    // **************UpdateReview*************************//
    UpdateReview=async(req,res)=>{
        try{
            const{catagory_id,Brand_id,model_id,review}=req.body
            const id=req.params.id
            const updatereview=await ReviewModel.findByIdAndUpdate(id,{
                catagory_id,Brand_id,model_id,review
            },{new:true})
            if(updatereview){
                return res.status(201).json({
                    message:'review update done..',
                    updatedata:updatereview
                })
            }
        }catch(error){
            return res.status(500).json({
                error:error.message
            })
        }
    }
}

module.exports=new LookupController()