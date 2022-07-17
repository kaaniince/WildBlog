import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import blogRouter from './routers/blogRouter.js'



dotenv.config()//env içindekiler böyle çağırılır. env dosyasının içindekileri paylaşmak istemeyiz. githuba yüklenmez bu yüzden.
const app = express()

app.use(express.json({limit:'20mb'}))

//localhost:5000/memories
app.use('/blogs',blogRouter)


app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }).then(()=>console.log("connected to db"))
    .catch((err)=>console.log(err))
})
