import User from "../models/user.js";
import Post from "../models/post.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        const user_email = req.user.email

        const { post,description} = req.body

        await Post.create({
            user_email: user_email,
            post: post,
            description: description,
        })
        return res.status(200).json({
            status: true,
            message: "Post Created Successfully"
          })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + err
          })
        }
    }
    
    export const deletePost = async (req, res) => {
        try {
            const { post_id } = req.body;
            
            if(await Post.findById(post_id) == null){
                return res.status(424).json({
                    status: false,
                    message: "Post does not exist"
                  })     
            }
            await Post.findByIdAndDelete(post_id);
            
            return res.status(200).json({
                status: true,
                message: "Post Deleted"
              })     
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "An error occurred"
                  })     
                }
            }

export const commentUnderPost  = async (req, res) => {
    try {
        const { post_id, comment} = req.body;
    
        await Post.findByIdAndUpdate(post_id,{
            $push:{ comment: comment }
        })
        return res.status(200).json({
            status: true,
            message: "Commented successfully"
          })     
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
          })     
        }
    }

    export const getPosts = async(req, res) =>{
        try {
            const posts = await Post.find()
            
            return res.status(200).json({
                status: true,
                message: "all posts",
                data: posts
            })     
        } catch (error) {
            return res.status(500).json({
            status: false,
            message: "An error occurred"
        })     
    }
}

export const getSinglePost = async (req, res) =>{
    try {
        const post_id = await req.query.post_id

        const post = await Post.findById(post_id)
        return res.status(200).json({
            status: true,
            message: "Single post",
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + error
        })
    }
}