import express from 'express'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blog.js' 
import userRouter from './routes/user.js'
import cors from 'cors'

const app=express();

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MONGO_URL,
 {
    dbName: "anu"
}).then( () => console.log("Mongodb Connected"))

app.use('/api/users',userRouter)

app.use('/api/blogs',blogRouter)



 


const port=4000;
app.listen(process.env.PORT,()=>console.log('Server is Running on Port 4000'));