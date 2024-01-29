//modulebase approch ES6 file
import express from "express"
import colors from 'colors'
import dotenv from "dotenv"
import morgan from 'morgan'
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import path from "path"
import {fileURLToPath} from 'url';
//configure env
dotenv.config()

//connectDB
connectDB();

//esmodule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//rest object
const app=express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes)

//rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server runnig on ${process.env.DEV_MODE} mode on ${port}`.bgCyan.white)
})
