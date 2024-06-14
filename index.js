const express=require("express")
const app=express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dotenv=require("dotenv")
dotenv.config()
const MongoDb_Connection=require("./Config/Database")
MongoDb_Connection()

// ***************LookupRoute*******************//
const LookupRoute=require("./Router/LookupRoute")
app.use(LookupRoute)


const port=6666
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})