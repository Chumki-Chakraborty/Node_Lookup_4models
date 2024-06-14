const mongoose=require("mongoose")

const ConnetDb=async(req,res)=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected ${conn.connection.host}`);
    }catch(error){
        console.log(`Mongodb Not Connected ${error}`);
    }
}

module.exports=ConnetDb