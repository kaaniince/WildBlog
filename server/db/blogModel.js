import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Blog = mongoose.model('blog',blogSchema)
export default Blog