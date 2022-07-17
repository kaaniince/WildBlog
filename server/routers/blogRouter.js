import express, { application } from 'express'
import mongoose from 'mongoose'
import Blog from '../db/blogModel.js'
const router = express.Router()

//get all blogs from db
router.get('/',async(req,res)=>{

    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
})
//get single blogs from db

router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:'Blog id is not valid'})
        const blog = await Blog.findById(id)
        if(!blog) return
        res.status(200).json(blog)
    } catch (error) {
        res.status(404).json({message:'Memory not found'})
    }
})
//create a blog 

router.post('/',async(req,res)=>{
    try {
        const blog = req.body
        const createdBlog = await Blog.create(blog)
        res.status(201).json(createdBlog)
    } catch (error) {
        res.json({message:'Create blog failed'})

    }


})

//update a blog 

router.put('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:'Blog id is not valid'})
            const{title,contenct,creator,image} = req.body
    
            const updateBlog = await Blog.findByIdAndUpdate(id,{title,contenct,creator,image,_id:id},{new:true})
            res.status(200).json(updateBlog)
    
    } catch (error) {
        console.log(error.message)
        res.json({message:'Update failed'})
    }
 
})

//delete a blog 

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:'Blog id is not valid'})
        await Blog.findByIdAndDelete(id)
        res.status(200).json({message:'Blog has been deleted'})
    } catch (error) {
        console.log(error.message)
        res.json({message:'Delete failed'})
    }
})

export default router